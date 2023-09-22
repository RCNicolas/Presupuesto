

# Sistema de Gestión de Ingresos y Egresos

Este repositorio contiene el código fuente de un sistema simple de gestión de ingresos y egresos. El sistema utiliza HTML, CSS y JavaScript para crear una interfaz de usuario que permite al usuario agregar, editar y eliminar transacciones de ingresos y egresos. También proporciona la capacidad de buscar transacciones por nombre de producto.

## Contenido

* [Requisitos](#requisitos)
* [Instalación](#instalación)
* [Uso](#uso)
* [Funcionalidades](#funcionalidades)


## Requisitos

Para ejecutar este sistema de gestión de ingresos y egresos, necesitará:

* Un navegador web moderno (por ejemplo, Google Chrome, Mozilla Firefox).
* Conexión a Internet para cargar las dependencias externas.

## Instalación

No se requiere una instalación especial para ejecutar este sistema, ya que se puede abrir en cualquier navegador web. Simplemente siga estos pasos:

1. Clone este repositorio en su máquina local:

        git clone https://github.com/RCNicolas/Presupuesto.git

1. Navegue hasta la carpeta del repositorio:

        cd Presupuesto

1. Abra el archivo `index.html` en su navegador web.

## Uso

Una vez que haya abierto el sistema en su navegador, verá una interfaz de usuario que le permite realizar las siguientes acciones:

### Agregar una Transacción

* Complete el formulario en la sección "Agregar Transacción" con el valor, cantidad y nombre del producto.
* Seleccione si es una transacción de ingreso o egreso.
* Haga clic en el botón "Guardar" para agregar la transacción a la lista.

### Editar una Transacción

* Haga clic en el botón "Editar" junto a la transacción que desea modificar.
* En el cuadro de diálogo "Editar Datos", realice los cambios necesarios en el formulario.
* Haga clic en el botón "Guardar" en el cuadro de diálogo para guardar los cambios.

### Eliminar una Transacción

* Haga clic en el botón "Eliminar" junto a la transacción que desea eliminar.
* Confirme la eliminación en el cuadro de diálogo.

### Buscar una Transacción

* Utilice el campo de búsqueda en la parte superior para buscar transacciones por nombre de producto.
* Las transacciones que coincidan con el término de búsqueda se mostrarán en la tabla.

## Funcionalidades

Este sistema de gestión de ingresos y egresos incluye las siguientes funcionalidades:

* Agregar, editar y eliminar transacciones.
* Filtrar transacciones por nombre de producto.
* Mostrar una lista de transacciones en una tabla.
* Gestión de transacciones utilizando una API ficticia ([mockapi.io](http://mockapi.io/)).
