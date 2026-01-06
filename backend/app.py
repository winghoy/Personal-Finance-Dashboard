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

# Sums up all transactions per category
@app.get('/category_sums')
def get_category_sums():
    df = load_csv()
    df = df.groupby('category')['amount'].sum().reset_index()
    response = df.to_dict(orient='records')
    return response

# Sums up all transactions in each month
@app.get('/monthly_sums')
def get_monthly_sums():
    df = load_csv()
    df = df.set_index('date').resample('ME')['amount'].sum().reset_index()
    df['month'] = df['date'].dt.strftime('%Y-%m')
    df = df[['month', 'amount']]
    response = df.to_dict(orient='records')
    return response

# Spending by category per month


# List of top merchants {filter by month?}


# Daily spending heatmap