import express from 'express'
import { routerProductos } from './router/routerProductos.js'
import { routerCarritos } from './router/routerCarritos.js'

const app = express()
app
	.use(express.urlencoded({ extended: true }))
	.use(express.json())
	.set('view engine', 'ejs')

app
	.use('/productos', (req, res) => {
		res.render('productos')
	})
	.use('/carrito', (req, res) => {
		res.render('carrito')
	})

app
	.use('/api/productos', routerProductos)
	.use('/api/carrito', routerCarritos)
	.get('*', function (req, res) {
		res.render('home')
	})
	// Por defecto - rutas no válidas
	.use(function (req, res) {
		res.json({ error: 'ruta no implementada' })
	})

const PORT = 8080
const server = app.listen(PORT, () => {
	console.log(`Servidor escuchando el puerto ${server.address().port}`)
})

server.on('error', (error) => console.log(`Error en servidor ${error}`))
