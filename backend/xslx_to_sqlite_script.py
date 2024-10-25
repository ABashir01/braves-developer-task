import pandas as pd
import sqlite3

def xlsx_to_sqlite(xlsx_file, sqlite_db):
    excel_data = pd.ExcelFile(xlsx_file)
    
    conn = sqlite3.connect(sqlite_db)
    for sheet_name in excel_data.sheet_names:
        df = excel_data.parse(sheet_name)    
        df.to_sql(sheet_name, conn, if_exists='replace', index=False)
    
    conn.close()

if __name__ == "__main__":
    xlsx_file = 'backend/data/BattedBallData.xlsx'
    sqlite_db = 'backend/data/BattedBallData.db'
    
    xlsx_to_sqlite(xlsx_file, sqlite_db)