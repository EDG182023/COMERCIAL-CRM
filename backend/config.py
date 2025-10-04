import urllib

class Config:
    SQL_SERVER = "ESADC01"       # Ej: "localhost" o "192.168.1.100"
    SQL_DATABASE = "crm"         # Nombre de la BD
    SQL_USERNAME = "sa"
    SQL_PASSWORD = "ESA.2008"

    # Cadena de conexión para SQLAlchemy con pyodbc
    params = urllib.parse.quote_plus(
        f"DRIVER={{ODBC Driver 17 for SQL Server}};"
        f"SERVER={SQL_SERVER};"
        f"DATABASE={SQL_DATABASE};"
        f"UID={SQL_USERNAME};"
        f"PWD={SQL_PASSWORD}"
    )

    SQLALCHEMY_DATABASE_URI = f"mssql+pyodbc:///?odbc_connect={params}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False