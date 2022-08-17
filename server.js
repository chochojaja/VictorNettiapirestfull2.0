const {response} = require('express')
const express = require('express')
const Contenedor = require ("./contenedor")
const app = express()
const {Router} = express
const routerProductos = Router()

app.use(routerProductos)
app.use(express.static(__dirname+'public'))
app.use(express.json())
app.use(express.static('file'))
app.use(express.urlencoded({ extended : true })) 

const arrayProductos = []

routerProductos.get('/api/productos', async ( req, res )=> {
   
    try {
        const contenedor = new Contenedor('./producto.txt')        
        const productos = await contenedor.getAll()
        console.log(productos)
        res.send({status: 200, productos})
        
    } catch (error) {
        res.send({status: 500, error})
    }
})


routerProductos.get('/api/productos:id', async ( req, res )=> {
    try {
        const { id } = req.params 
        console.log(id)
        const contenedor = new Contenedor('./producto.txt')        
        const productos = await contenedor.getById(id)
         console.log(productos)
        res.send({status: 200, productos})
        
    } catch (error) {
        res.send({status: 500, error})
    }
})


routerProductos.post('/', (req , res)=>{
    const objProducto = req.body
    const contenedor = new Contenedor('./productos.txt')
    contenedor.save(objProducto)
   console.log(objProducto)
    res.json({msg: `producto guardado`,
            Producto:[...arrayProductos,{objProducto}]
        })

 })

routerProductos.put('/:id', (req , res)=>{
    const { id } = req.params 
    console.log(id)
   const objProductos = req.body
   console.log(objProductos)
   const contenedor = new Contenedor ('./producto.txt')
   contenedor.updateById(id, parseInt(id),... objProductos ) 
   const respuesta = updateById({ id: title , price , thumbnail })
   res.send({respuesta})

 })


 routerProductos.delete('/api/productos:id', async ( req, res )=> {
    try {
        const { id } = req.params 
        
        const contenedor = new Contenedor('./producto.txt')        
        const productos = await contenedor.deleteAll(id)
         console.log(productos)
        res.send({status: 200, mensaje:'producto eliminado'})
        
    } catch (error) {
        res.send({status: 500, error})
    }
})



app.use('/api/productos', routerProductos)

app.listen(3000, error =>{
    if (error) throw error
    console.log(`servidor escuchando en el puerto 3000`)
})