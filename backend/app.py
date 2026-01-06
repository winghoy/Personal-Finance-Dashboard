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
    df['date'] = pd.to_datetime(df['date'])
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

# df = pd.DataFrame({
#     'amount': ['100.00', '2400.00'],
#     'date': pd.to_datetime(pd.Series(['2025-10-01','2026-11-01']))
# })

# print(filter_df(df, year=2025, month=10))

# Sums up all transactions per category
@app.get('/category')
def get_category_sums(year: int = None, 
                      month: int = None, 
                      start: str = None, 
                      end: str = None):
    df = load_csv()
    df = filter_df(df, year, month, start, end)
    df = df.groupby('category')['amount'].sum().reset_index()
    response = df.to_dict(orient='records')
    return response

# Sums up all transactions in each month
@app.get('/monthly')
def get_monthly_sums():
    df = load_csv()
    df = df.set_index('date').resample('ME')['amount'].sum().reset_index()
    df['month'] = df['date'].dt.strftime('%Y-%m')
    df = df[['month', 'amount']]
    response = df.to_dict(orient='records')
    return response

# List of top merchants
@app.get('/merchants')
def get_merchants():
    df = load_csv()
    df = df.groupby('merchant')['amount'].sum().reset_index()
    df = df.sort_values(by=['amount', 'merchant'], ascending=False)
    response = df.to_dict(orient='records')
    return response

# Daily spending heatmap