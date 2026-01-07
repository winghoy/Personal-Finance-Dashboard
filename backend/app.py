import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

def load_csv():
    df = pd.read_csv('test.csv')
    df['date'] = pd.to_datetime(df['date'], dayfirst=True)
    df['amount'] = df['amount'].astype(float)
    return df

def filter_df(df, year, month, start, end):
    if year:
        df = df[df['date'].dt.year == year]
    if month:
        df = df[df['date'].dt.month == month]
    if start:
        df = df[df['date'] >= pd.to_datetime(start)]
    if end:
        df = df[df['date'] <= pd.to_datetime(end)]
    return df

# Sums up all transactions per category
@app.get('/category')
def get_category_sums(year: int = None, 
                      month: int = None, 
                      start: str = None, 
                      end: str = None):
    df = root_df.copy()
    df = filter_df(df, year, month, start, end)
    df = (
        df.groupby('category')['amount']
        .sum()
        .reset_index()
    )
    response = df.to_dict(orient='records')
    return response

# Sums up all transactions in each month
@app.get('/monthly')
def get_monthly_sums(year: int = None, 
                     month: int = None, 
                     start: str = None, 
                     end: str = None):
    df = root_df.copy()
    df = filter_df(df, year, month, start, end)
    df = (
        df.set_index('date')
        .resample('ME')['amount']
        .sum()
        .reset_index()
    )
    df['month'] = df['date'].dt.strftime('%m/%Y')
    df = df[['month', 'amount']]
    response = df.to_dict(orient='records')
    return response

# List of top merchants
@app.get('/merchants')
def get_merchants(year: int = None, 
                  month: int = None, 
                  start: str = None, 
                  end: str = None):
    df = root_df.copy()
    df = filter_df(df, year, month, start, end)
    df = (
        df.groupby('merchant')['amount']
        .sum()
        .reset_index()
    )
    df = df.sort_values(by=['amount', 'merchant'], ascending=False)
    response = df.to_dict(orient='records')
    return response

# Daily spending
@app.get('/daily')
def get_daily(year: int = None, 
              month: int = None, 
              start: str = None, 
              end: str = None):
    df = root_df.copy()
    df = filter_df(df, year, month, start, end)
    date_range = pd.date_range(df['date'].min(), df['date'].max())
    df = (
        df.groupby('date', as_index=True)['amount']
        .sum()
        .reindex(date_range, fill_value=0)
        .rename_axis('date')
        .reset_index()
    )
    df['date'] = df['date'].dt.strftime('%d/%m/%Y')
    response = df.to_dict(orient='records')
    return response

@app.get('/date')
def get_date():
    df = root_df.copy()
    years = df['date'].dt.year.unique().tolist()
    months = df['date'].dt.month.unique().tolist()
    return {'years': years, 'months': months}

root_df = load_csv()