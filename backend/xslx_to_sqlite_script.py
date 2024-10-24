import pandas as pd
import sqlite3

def xlsx_to_sqlite(xlsx_file, sqlite_db):
    # Load the Excel file
    excel_data = pd.ExcelFile(xlsx_file)
    
    # Connect to the SQLite database (or create it)
    conn = sqlite3.connect(sqlite_db)
    
    for sheet_name in excel_data.sheet_names:
        # Read each sheet into a DataFrame
        df = excel_data.parse(sheet_name)
        
        # Write the DataFrame to the SQLite database
        df.to_sql(sheet_name, conn, if_exists='replace', index=False)
    
    # Close the connection
    conn.close()

if __name__ == "__main__":
    xlsx_file = 'backend/data/BattedBallData.xlsx'
    sqlite_db = 'backend/data/BattedBallData.db'
    
    xlsx_to_sqlite(xlsx_file, sqlite_db)