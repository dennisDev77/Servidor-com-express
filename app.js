const express=require('express')
const {engine}=require('express-handlebars')
const mysql =require('mysql')

//Inicializando express
let app=express()

let porta=3000 // A porta que iremosusar para o nosso servdor

//Inicilaizando handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

//Utilizando css
app.use(express.static('public'))

//Transfomrnado o nosso body em obj json

app.use(express.urlencoded({
    extended:true,
}))
app.use(express.json())

//criando as rotas
app.get('/', (req,res)=>{
    res.render('home')
})

app.get('/curso/add', (req,res)=>{
    res.render('cadastrar')
})

app.post('/salvar/dados', (req,res)=>{
    let nome=req.body.nome
    let duracao=req.body.duracao
    
    const dados=`insert into curso values('default', '${nome}', '${duracao}')`

    conectar.query(dados, function(err){

        if(err){
            console.log(`Erro de sintaxe na sua query ${err}`)
        }else{
            res.redirect('/curso/ver')
        }
    })
})

app.get('/curso/ver', (req,res)=>{

    let dados=`select *from curso`

    conectar.query(dados, (err,data)=>{

        if(err){
            console.log(err)
        }else{
            let curso=data
            res.render('curso', {curso})
        }
    })
   
})

app.get('/curso/ver/:id', (req,res)=>{

    let id=req.params.id

    dados=`select *from curso where id=${id}`

    conectar.query(dados, function(err,data){
        if(err){
            console.log(err)
        }else{
            let curso=data[0]
            res.render('filtro', {curso})
        }
    })
  
   
})

app.get('/curso/edit/:id', (req,res)=>{

    let id=req.params.id

    dados=`select *from curso where id=${id}`

    conectar.query(dados, (err, data)=>{
       if(err){
        console.log(err)
       }else{
        let curso=data[0]

        res.render('editar', {curso})
       }
    })
})

app.post('/curso/update', (req,res)=>{
    let id=req.body.id
    let nome=req.body.nome
    let duracao=req.body.duracao

    let dados=`update curso set nome='${nome}', duracao='${duracao}' where id=${id}`

    conectar.query(dados, (err, data)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/curso/ver')
        }
    })
})

app.post('/curso/remove/:id', (req,res)=>{
    let id=req.params.id

   let dados=`delete from curso where id=${id}`

   conectar.query(dados, (err,data)=>{
    if(err){
        console.log(err)
    }
    else{
        res.redirect('/curso/ver')
    }
   })
})

app.listen(porta, ()=>{
    console.log(`Rodando na porta ${porta}`)
})

//Criando conexao
const conectar=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'baseteste2',
})

conectar.connect( function(err){
    if(err){
        console.log(`Erro ao conctar com a base de dados, verifique se ela existe ${err}`)
    }else{
        console.log(`Base de dados conectado`)
    }
})