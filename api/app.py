from rotas import app, mysql
from flask import Flask, jsonify, redirect, request , url_for, session
from flask_mysqldb import  MySQLdb
import simplejson as json
from flask_cors import CORS

CORS(app)

@app.route('/cda_padrao_abastecimentos', methods=['GET'])
def banco():

    curl1 = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    curl1.execute("SELECT cda_padrao_abastecimentos.id_cda, cda_padrao_abastecimentos.id_modelo_veiculo,modelo_veiculos.descricao veiculo_descricao , cdas.descricao cda_descricao,cda_padrao_abastecimentos.qtd_litros_abastec_padrao,cda_padrao_abastecimentos.media_padrao FROM cda_padrao_abastecimentos inner join cdas on cdas.id_cda =  cda_padrao_abastecimentos.id_cda  inner join modelo_veiculos on cda_padrao_abastecimentos.id_modelo_veiculo  =  modelo_veiculos.id_modelo ;")
    rows1 = curl1.fetchall()
    curl1.close()
    print(rows1)
    return json.dumps(rows1)

@app.route('/cdas', methods=['GET'])
def banco1():
    curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    curl.execute("SELECT * FROM  cdas")
    rows = curl.fetchall()
    curl.close()
    return json.dumps(rows)

@app.route('/modelo_veiculos', methods=['GET'])
def banco2():
    curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    curl.execute("SELECT * FROM  modelo_veiculos")
    rows = curl.fetchall()
    curl.close()
    return json.dumps(rows)

@app.route('/filter', methods=['POST'])
def banco3():
    request_data = json.loads(request.data)
    id_cda = int(request_data['id'])
    print(id_cda)

    if id_cda == 0:
        curl1 = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        curl1.execute("SELECT cda_padrao_abastecimentos.id_cda, cda_padrao_abastecimentos.id_modelo_veiculo,modelo_veiculos.descricao veiculo_descricao , cdas.descricao cda_descricao,cda_padrao_abastecimentos.qtd_litros_abastec_padrao,cda_padrao_abastecimentos.media_padrao FROM cda_padrao_abastecimentos inner join cdas on cdas.id_cda =  cda_padrao_abastecimentos.id_cda  inner join modelo_veiculos on cda_padrao_abastecimentos.id_modelo_veiculo  =  modelo_veiculos.id_modelo ;")
        rows1 = curl1.fetchall()
        curl1.close()
        print(rows1,'teste')
        return json.dumps(rows1)

    print(id_cda)
    curl1 = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    curl1.execute("SELECT cda_padrao_abastecimentos.id_cda , cda_padrao_abastecimentos.id_modelo_veiculo,modelo_veiculos.descricao veiculo_descricao , cdas.descricao cda_descricao,cda_padrao_abastecimentos.qtd_litros_abastec_padrao,cda_padrao_abastecimentos.media_padrao FROM cda_padrao_abastecimentos inner join cdas on cdas.id_cda =  cda_padrao_abastecimentos.id_cda  inner join modelo_veiculos on cda_padrao_abastecimentos.id_modelo_veiculo  =  modelo_veiculos.id_modelo where cda_padrao_abastecimentos.id_cda  = %s ;", (id_cda,))
    rows1 = curl1.fetchall()
    curl1.close()
    print(rows1)
    return json.dumps(rows1)



 
if __name__ == '__main__':
    app.run(debug=True)