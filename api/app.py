from rotas import app, mysql
from flask import Flask, jsonify, redirect, request , url_for, session
from flask_mysqldb import  MySQLdb
import simplejson as json
from flask_cors import CORS

CORS(app)


@app.route('/cdas', methods=['GET'])
def banco1():
    curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    curl.execute("SELECT descricao label, id_cda value FROM cdas;")
    rows = curl.fetchall()
    curl.close()
    return json.dumps(rows)



@app.route('/veiculos', methods=['POST'])
def veiculos():
    print('teste')
    request_data = json.loads(request.data)
    modeloVeiculo = request_data['value']
    print(modeloVeiculo)
    curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    curl.execute("SELECT cpa1.id_cda_padrao_abastec, cpa1.id_cda, cpa1.id_modelo_veiculo,modelo_veiculos.descricao veiculo_descricao , cdas.descricao cda_descricao,cpa1.qtd_litros_abastec_padrao,cpa1.media_padrao  FROM cda_padrao_abastecimentos cpa1 inner join cdas on cdas.id_cda =  cpa1.id_cda   inner join modelo_veiculos on cpa1.id_modelo_veiculo  =  modelo_veiculos.id_modelo and modelo_veiculos.id_modelo = %s union all  select null, cda.id_cda, mv.id_modelo, mv.descricao, cda.descricao,0,0  FROM cdas cda, modelo_veiculos mv where not exists (select null from cda_padrao_abastecimentos cpa where cpa.id_cda = cda.id_cda and cpa.id_modelo_veiculo = mv.id_modelo) and mv.id_modelo = %s;",(modeloVeiculo,modeloVeiculo,))
    rows = curl.fetchall()
    curl.close()
    return json.dumps(rows)

@app.route('/veiculo', methods=['GET'])
def veiculoo():

    curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    curl.execute("SELECT * FROM modelo_veiculos;")
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
        curl1.execute("SELECT cpa1.id_cda_padrao_abastec, cpa1.id_cda, cpa1.id_modelo_veiculo,modelo_veiculos.descricao veiculo_descricao , cdas.descricao cda_descricao,cpa1.qtd_litros_abastec_padrao,cpa1.media_padrao FROM cda_padrao_abastecimentos cpa1 inner join cdas on cdas.id_cda =  cpa1.id_cda  inner join modelo_veiculos on cpa1.id_modelo_veiculo  =  modelo_veiculos.id_modelo union all select null, cda.id_cda, mv.id_modelo, mv.descricao, cda.descricao,0,0 FROM cdas cda, modelo_veiculos mv where not exists (select null from cda_padrao_abastecimentos cpa where cpa.id_cda = cda.id_cda and cpa.id_modelo_veiculo = mv.id_modelo);")
        rows1 = curl1.fetchall()
        curl1.close()
        return json.dumps(rows1)

    curl1 = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    curl1.execute("SELECT cpa1.id_cda_padrao_abastec, cpa1.id_cda, cpa1.id_modelo_veiculo,modelo_veiculos.descricao veiculo_descricao , cdas.descricao cda_descricao,cpa1.qtd_litros_abastec_padrao,cpa1.media_padrao FROM cda_padrao_abastecimentos cpa1 inner join cdas on cdas.id_cda =  cpa1.id_cda  and cdas.id_cda = %s inner join modelo_veiculos on cpa1.id_modelo_veiculo  =  modelo_veiculos.id_modelo union all select null, cda.id_cda, mv.id_modelo, mv.descricao, cda.descricao,0,0  FROM cdas cda, modelo_veiculos mv where not exists (select null from cda_padrao_abastecimentos cpa where cpa.id_cda = cda.id_cda 	and cpa.id_modelo_veiculo = mv.id_modelo) and	cda.id_cda = %s ;",(id_cda,id_cda,))
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
    media = float(request_data['media'])
    litros = int(request_data['litros'])
    id_cda = int(request_data['id_cda'])
    id_modelo = int(request_data['id_modelo'])



    curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    curl.execute("select id_cda, id_modelo_veiculo from cda_padrao_abastecimentos where id_cda = %s and id_modelo_veiculo = %s",(id_cda,id_modelo,))
    rows = curl.fetchall()
    curl.close()
    if rows == ():
        curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        curl.execute("INSERT INTO cda_padrao_abastecimentos (id_cda, id_modelo_veiculo, qtd_litros_abastec_padrao, media_padrao) VALUES (%s, %s, %s, %s);",(id_cda,id_modelo,litros,media))
        rows = curl.fetchall()
        curl.close()
        mysql.connection.commit()
        return json.dumps(rows)
        
    else:
        cdapadrao = int(request_data['id_CdaPadrao'])
        
        if media <= 99:
            curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            curl.execute("UPDATE cda_padrao_abastecimentos SET qtd_litros_abastec_padrao = %s , media_padrao = %s  WHERE (id_cda_padrao_abastec =%s );",(litros,media,cdapadrao))
            rows = curl.fetchall()
            curl.close()
            mysql.connection.commit()
            return json.dumps(rows)
        else:
            erro = {
                'error':1
            }
            return json.dumps(erro)

    

    



@app.route('/deletar', methods=['POST'])
def deletar():
    request_data = json.loads(request.data)
    cdapadrao = int(request_data['id_CdaPadrao'])


    curl = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    curl.execute("DELETE FROM cda_padrao_abastecimentos WHERE (id_cda_padrao_abastec = %s);",(cdapadrao,))
    rows = curl.fetchall()
    curl.close()
    mysql.connection.commit()

    return json.dumps(rows)





 
if __name__ == '__main__':
    app.run(debug=True)








# var xhr = new XMLHttpRequest();
# xhr.open("POST", 'http://127.0.0.1:5000/deletar', true);
# xhr.setRequestHeader('Content-Type', 'application/json');
# xhr.send(JSON.stringify({
#     id_CdaPadrao: 57
# }));






# var url = "https://dicasdejavascript.com.br/exemplo.txt";//Sua URL

# var xhttp = new XMLHttpRequest();
# xhttp.open("GET", 'http://127.0.0.1:5000/cdas', false);
# xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
# console.log(xhttp.responseText);





#     SELECT cpa1.id_cda_padrao_abastec
# , cpa1.id_cda
# , cpa1.id_modelo_veiculo
# ,modelo_veiculos.descricao veiculo_descricao , cdas.descricao cda_descricao
# ,cpa1.qtd_litros_abastec_padrao
# ,cpa1.media_padrao 
# FROM cda_padrao_abastecimentos cpa1
# inner join cdas on cdas.id_cda =  cpa1.id_cda  
# inner join modelo_veiculos on cpa1.id_modelo_veiculo  =  modelo_veiculos.id_modelo
# union all 
# select null, cda.id_cda, mv.id_modelo, mv.descricao, cda.descricao,0,0 
# FROM cdas cda, modelo_veiculos mv
# where not exists (select null 
# 					from cda_padrao_abastecimentos cpa 
# 					where cpa.id_cda = cda.id_cda 
# 					and cpa.id_modelo_veiculo = mv.id_modelo)
# ;







# EU QUE FIZ =)

#     SELECT cpa1.id_cda_padrao_abastec
# , cpa1.id_cda
# , cpa1.id_modelo_veiculo
# ,modelo_veiculos.descricao veiculo_descricao , cdas.descricao cda_descricao
# ,cpa1.qtd_litros_abastec_padrao
# ,cpa1.media_padrao 
# FROM cda_padrao_abastecimentos cpa1
# inner join cdas on cdas.id_cda =  cpa1.id_cda  
# inner join modelo_veiculos on cpa1.id_modelo_veiculo  =  modelo_veiculos.id_modelo
# where cpa1.id_cda = 2 AND modelo_veiculos.id_modelo = 2
# union all 
# select null, cda.id_cda, mv.id_modelo , mv.descricao, cda.descricao,0,0
# FROM cdas cda, modelo_veiculos mv
# where cda.id_cda = 2 AND  mv.id_modelo = 2