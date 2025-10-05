# Referencia Técnica para a chamadas das procedures da Taxonmia

## Call procedure insert taxonomy


 **call sp_taxonomy_ins_id_v2**:

call sp_taxonomy_ins_id_v2(
				PE_UUID, 
				PE_SYSTEM_CLIENT_ID, 
				PE_STORE_ID,
				PE_APP_ID,
				PE_USER_ID, 
				PE_ID_TIPO,
				PE_PARENT_ID,
				PE_TAXONOMIA,
				PE_SLUG
			);

**Parâmetros:**

	- PE_UUID varchar(100),   (Valor gerado por função)
	- PE_SYSTEM_CLIENT_ID INT, (Carregar da variável de ambiente)
	- PE_STORE_ID INT, (Carregar da variável de ambiente)
	- PE_APP_ID INT, - (Carregar da variável de ambiente)
	- PE_USER_ID INT,  (pegar do ID do usuário logado)
	- PE_ID_TIPO int(11), (informado pelo usuário, valor padrão 1)
	- PE_PARENT_ID int(11),  (informado pelo usuário)
	- PE_TAXONOMIA varchar(100), (informado pelo usuário)
	- PE_SLUG varchar(300),(valor gerado em função do nome)



## Exemplo: Json desejado retornado pelo Serviço

```json
{
  "success": true,
  "statusCode": 100200,
  "message": "Cadastro criado com sucesso",
  "data": [
    {
      "ID_TAXONOMY": 4030,
      "ID_SYSTEM_CLIENTE": 2,
      "ID_LOJA": 1,
      "APP_ID": 2,
      "ID_USUARIO": 1,
      "ID_TIPO": 1,
      "PARENT_ID": 0,
      "TAXONOMIA": "Nome TAXONOMIA 1759521489",
      "SLUG": "nome-taxonomia-1759521489",
      "ORDEM": 0,
      "LEVEL": 1,
      "INATIVO": 0,
      "CREATEDAT": "2025-10-03T19:58:09.000Z",
      "UPDATEDAT": "2025-10-03T19:58:09.000Z"
    }
  ],
  "feedback": {
    "sp_return_id": 4030,
    "sp_message": "Cadastro criado com sucesso",
    "sp_error_id": 0
  },
  "operationResult": {
    "fieldCount": 0,
    "affectedRows": 2,
    "insertId": 0,
    "info": "",
    "serverStatus": 34,
    "warningStatus": 0,
    "changedRows": 0
  },
  "recordCount": 1
}
```
```json
{
  "success": true,
  "statusCode": 100200,
  "message": "Cadastro criado com sucesso",
  "data": [...],           // Dados da procedure
  "feedback": {...},       // Feedback estruturado
  "operationResult": {...}, // Resultado SQL
  "recordCount": 1
}

```

> **Nota:** A propriedade `rawResult` foi removida para evitar duplicação de dados. Todas as informações necessárias estão disponíveis nas propriedades `data`, `feedback` e `operationResult`.
