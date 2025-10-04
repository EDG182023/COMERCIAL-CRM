def is_quote_creation_stage(nombre_etapa: str) -> bool:
    return 'Cotizacion pendiente' in (nombre_etapa or '')

def is_contract_creation_stage(nombre_etapa: str) -> bool:
    return 'Cotizacion aceptada' in (nombre_etapa or '')