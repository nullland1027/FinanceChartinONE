from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
import asyncio
from typing import List, Optional
from pydantic import BaseModel

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MarketData(BaseModel):
    symbol: str
    name: str
    price: float
    change: float
    changePercent: float
    type: str
    region: Optional[str] = None

# In-memory store for mock data
market_data_store = [
    # Commodities
    {"symbol": "GC=F", "name": "COMEX 黄金", "price": 2050.50, "change": 12.30, "changePercent": 0.60, "type": "commodity"},
    {"symbol": "SI=F", "name": "COMEX 白银", "price": 23.45, "change": -0.15, "changePercent": -0.64, "type": "commodity"},
    {"symbol": "CL=F", "name": "WTI 原油", "price": 77.40, "change": 0.85, "changePercent": 1.11, "type": "commodity"},
    # CN Indices
    {"symbol": "000001.SS", "name": "上证指数", "price": 2865.90, "change": 15.20, "changePercent": 0.53, "type": "index", "region": "CN"},
    {"symbol": "399001.SZ", "name": "深证成指", "price": 8890.30, "change": -30.50, "changePercent": -0.34, "type": "index", "region": "CN"},
    {"symbol": "^HSI", "name": "恒生指数", "price": 15533.56, "change": -234.12, "changePercent": -1.48, "type": "index", "region": "CN"},
    # Global Indices
    {"symbol": "^N225", "name": "日经 225", "price": 36011.46, "change": 200.32, "changePercent": 0.56, "type": "index", "region": "Global"},
    {"symbol": "^FTSE", "name": "英国富时 100", "price": 7635.09, "change": 5.40, "changePercent": 0.07, "type": "index", "region": "Global"},
    # US Indices
    {"symbol": "IXIC", "name": "纳斯达克", "price": 15628.95, "change": 120.45, "changePercent": 0.78, "type": "index", "region": "US"},
    {"symbol": "GSPC", "name": "标普 500", "price": 4927.93, "change": 25.40, "changePercent": 0.52, "type": "index", "region": "US"},
    # Crypto
    {"symbol": "BTC-USD", "name": "Bitcoin", "price": 42000.00, "change": 500.00, "changePercent": 1.2, "type": "crypto"},
    {"symbol": "ETH-USD", "name": "Ethereum", "price": 2300.00, "change": 30.00, "changePercent": 1.3, "type": "crypto"},
    {"symbol": "BNB-USD", "name": "BNB", "price": 300.00, "change": 5.00, "changePercent": 1.6, "type": "crypto"},
    {"symbol": "SOL-USD", "name": "Solana", "price": 95.00, "change": 3.00, "changePercent": 3.2, "type": "crypto"},
    {"symbol": "DOGE-USD", "name": "Dogecoin", "price": 0.08, "change": 0.001, "changePercent": 1.25, "type": "crypto"},
]

async def update_prices_periodically():
    """Background task to simulate price fluctuations."""
    while True:
        for item in market_data_store:
            volatility = item["price"] * 0.0002
            drift = (random.random() - 0.5) * volatility
            item["price"] = round(item["price"] + drift, 2)
            item["change"] = round(item["change"] + drift, 2)
            # Simple calculation for change percent
            prev_price = item["price"] - item["change"]
            if prev_price != 0:
                item["changePercent"] = round((item["change"] / prev_price) * 100, 2)
        
        await asyncio.sleep(1) # Match the 1s update requirement

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(update_prices_periodically())

@app.get("/api/market-data", response_model=List[MarketData])
async def get_market_data():
    return market_data_store

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
