from rotas import app, mysql
from flask import Flask, jsonify, redirect, request , url_for, session
from flask_mysqldb import  MySQLdb
import simplejson as json
from flask_cors import CORS

CORS(app)


@app.route('/cdas', methods=['GET'])
def banco1():
    curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    curl.execute("SELECT descricao label, id_cda value FROM sys.cdas;")
    rows = curl.fetchall()
    curl.close()
    return json.dumps(rows)


@app.route('/pesquisa', methods=['POST'])
def pesquisa():
    request_data = json.loads(request.data)
    id_cda = int(request_data['value'])
    curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    curl.execute("SELECT modelo_veiculos.id_modelo value , modelo_veiculos.descricao label FROM modelo_veiculos LEFT JOIN cda_padrao_abastecimentos ON (modelo_veiculos.id_modelo = cda_padrao_abastecimentos.id_modelo_veiculo and cda_padrao_abastecimentos.id_cda = %s) WHERE modelo_veiculos.id_modelo IS NULL OR cda_padrao_abastecimentos.id_modelo_veiculo IS NULL",(id_cda,))
    rows = curl.fetchall()
    curl.close()
    return json.dumps(rows)

@app.route('/filter', methods=['POST'])
def banco3():
    request_data = json.loads(request.data)
    id_cda = int(request_data['value'])

    if id_cda == 0:
        curl1 = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        curl1.execute("SELECT cda_padrao_abastecimentos.id_cda_padrao_abastec, cda_padrao_abastecimentos.id_cda, cda_padrao_abastecimentos.id_modelo_veiculo,modelo_veiculos.descricao veiculo_descricao , cdas.descricao cda_descricao,cda_padrao_abastecimentos.qtd_litros_abastec_padrao,cda_padrao_abastecimentos.media_padrao FROM cda_padrao_abastecimentos inner join cdas on cdas.id_cda =  cda_padrao_abastecimentos.id_cda  inner join modelo_veiculos on cda_padrao_abastecimentos.id_modelo_veiculo  =  modelo_veiculos.id_modelo ;")
        rows1 = curl1.fetchall()
        curl1.close()
        return json.dumps(rows1)

    curl1 = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    curl1.execute("SELECT cda_padrao_abastecimentos.id_cda_padrao_abastec, cda_padrao_abastecimentos.id_cda , cda_padrao_abastecimentos.id_modelo_veiculo,modelo_veiculos.descricao veiculo_descricao , cdas.descricao cda_descricao,cda_padrao_abastecimentos.qtd_litros_abastec_padrao,cda_padrao_abastecimentos.media_padrao FROM cda_padrao_abastecimentos inner join cdas on cdas.id_cda =  cda_padrao_abastecimentos.id_cda  inner join modelo_veiculos on cda_padrao_abastecimentos.id_modelo_veiculo  =  modelo_veiculos.id_modelo where cda_padrao_abastecimentos.id_cda  = %s ;", (id_cda,))
    rows1 = curl1.fetchall()
    curl1.close()
    return json.dumps(rows1)


@app.route('/inserir', methods=['POST'])
def inserir():
    request_data = json.loads(request.data)
    id_cda = int(request_data['id_cda'])
    id_modelo = int(request_data['id_modelo'])
    media = float(request_data['media'])
    litros = float(request_data['litros'])
    print(media)

    try:
        if media < 99:
            curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            curl.execute("INSERT INTO cda_padrao_abastecimentos ( id_cda, id_modelo_veiculo,qtd_litros_abastec_padrao,media_padrao) VALUES ('%s', '%s', '%s', '%s');",(id_cda,id_modelo,litros,media))
            rows = curl.fetchall()
            mysql.connection.commit()
            curl.close()
    except:
        print('naopode')
    return json.dumps(rows)


@app.route('/editar', methods=['POST'])
def editar():
    request_data = json.loads(request.data)
    cdapadrao = int(request_data['cdapadrao'])
    media = float(request_data['media'])
    litros = int(request_data['litros'])

    
    if media <= 99:
        curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        curl.execute("UPDATE cda_padrao_abastecimentos SET qtd_litros_abastec_padrao = %s , media_padrao = %s  WHERE (id_cda_padrao_abastec =%s );",(litros,media,cdapadrao))
        rows = curl.fetchall()
        curl.close()
        mysql.connection.commit()
        return json.dumps(rows)
    else:
        print('a')
        erro = {
            'error':0
        }
        return json.dumps(erro)

    



@app.route('/deletar', methods=['POST'])
def deletar():
    request_data = json.loads(request.data)
    cdapadrao = int(request_data['cdapadrao'])
    media = float(request_data['media'])
    litros = int(request_data['litros'])

    curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    curl.execute("UPDATE cda_padrao_abastecimentos SET qtd_litros_abastec_padrao = %s , media_padrao = %s  WHERE (id_cda_padrao_abastec =%s );",(litros,media,cdapadrao))
    rows = curl.fetchall()
    curl.close()
    mysql.connection.commit()

    return json.dumps(rows)





 
if __name__ == '__main__':
    app.run(debug=True)