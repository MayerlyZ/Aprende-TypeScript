import React, { useState, useEffect, useRef, FC, ReactNode } from 'react';

// --- TIPOS DE DATOS (TypeScript) ---

// Estructura para un ejercicio individual
interface IExercise {
  id: number;
  text: string;
  difficulty: 'Fácil' | 'Intermedio' | 'Difícil';
}

// Píldora para cada tema individual
// type TopicColor is defined later, so this duplicate is removed.

// Estructura para un tema, ahora con una lista de ejercicios.
interface ITopic {
  name: string;
  color: TopicColor;
  description: string;
  codeExample: string;
  exercises: IExercise[];
}

// Estructura para las actividades de un día.
interface IDay {
  day: string; // Cambiado de 'days' a 'day'
  title: string;
  topics: ITopic[];
}

// Estructura para una semana completa del plan.
interface IWeek {
  week: number;
  title:string;
  goal: string;
  days: IDay[];
}

// --- DATOS DEL PLAN DE ESTUDIO (COMPLETOS Y POR DÍA) ---
const studyPlanData: IWeek[] = [
    {
        week: 1,
        title: "Dominando los Fundamentos de JavaScript",
        goal: "Construir una base sólida en la lógica de programación con JavaScript, el lenguaje sobre el que construiremos todo lo demás.",
        days: [
            { day: "Lunes", title: "Toma de Decisiones", topics: [
                { 
                    name: "if/else", color: "sky", description: "Permite que tu código tome decisiones. Ejecuta un bloque de código si una condición es verdadera y, opcionalmente, otro bloque si es falsa.", 
                    codeExample: "const edad = 18;\nif (edad >= 18) {\n  console.log('Eres mayor de edad');\n} else {\n  console.log('Eres menor de edad');\n}", 
                    exercises: [
                        { id: 1, text: "Verifica si un número es positivo.", difficulty: 'Fácil' },
                        { id: 2, text: "Comprueba si una persona puede votar (edad >= 18).", difficulty: 'Fácil' },
                        { id: 3, text: "Determina si un string está vacío.", difficulty: 'Fácil' },
                        { id: 4, text: "Verifica si un número es par o impar.", difficulty: 'Intermedio' },
                        { id: 5, text: "Comprueba si un usuario y contraseña son correctos.", difficulty: 'Intermedio' },
                        { id: 6, text: "Calcula el mayor de dos números.", difficulty: 'Intermedio' },
                        { id: 7, text: "Determina la nota de un examen (A, B, C, F) basado en un puntaje.", difficulty: 'Intermedio' },
                        { id: 8, text: "Verifica si un año es bisiesto.", difficulty: 'Difícil' },
                        { id: 9, text: "Calcula el mayor de tres números.", difficulty: 'Difícil' },
                        { id: 10, text: "Determina si un triángulo es equilátero, isósceles o escaleno dados sus lados.", difficulty: 'Difícil' }
                    ]
                },
                { 
                    name: "switch", color: "sky", description: "Una forma limpia de comparar una variable contra múltiples valores posibles, ideal para reemplazar cadenas de 'if/else if'.", 
                    codeExample: "const dia = 'Lunes';\nswitch (dia) {\n  case 'Lunes':\n    console.log('Inicio de semana');\n    break;\n  default:\n    console.log('Otro día');\n}", 
                    exercises: [
                        { id: 1, text: "Dado un número del 1 al 7, devuelve el día de la semana.", difficulty: 'Fácil' },
                        { id: 2, text: "Determina la estación del año según el mes.", difficulty: 'Fácil' },
                        { id: 3, text: "Devuelve un saludo diferente según el idioma ('en', 'es', 'fr').", difficulty: 'Fácil' },
                        { id: 4, text: "Clasifica un carácter como vocal o consonante.", difficulty: 'Intermedio' },
                        { id: 5, text: "Simula un menú de opciones (1. Ver saldo, 2. Depositar, etc.).", difficulty: 'Intermedio' },
                        { id: 6, text: "Determina el número de días de un mes.", difficulty: 'Intermedio' },
                        { id: 7, text: "Asigna un rol de usuario ('Admin', 'Editor', 'Guest') según un código.", difficulty: 'Intermedio' },
                        { id: 8, text: "Calcula una operación básica (+, -, *, /) según un operador.", difficulty: 'Difícil' },
                        { id: 9, text: "Determina el tipo de tarjeta de crédito según los primeros dígitos.", difficulty: 'Difícil' },
                        { id: 10, text: "Implementa una máquina de estados simple para un semáforo (rojo, amarillo, verde).", difficulty: 'Difícil' }
                    ]
                },
            ]},
            { day: "Martes", title: "Acciones Repetitivas", topics: [
                { 
                    name: "for / while", color: "sky", description: "Sirven para repetir una acción múltiples veces. 'for' es ideal cuando sabes cuántas veces, y 'while' cuando la repetición depende de una condición.", 
                    codeExample: "for (let i = 0; i < 5; i++) {\n  console.log(`Número: ${i}`);\n}", 
                    exercises: [
                        { id: 1, text: "Imprime los números del 1 al 10.", difficulty: 'Fácil' },
                        { id: 2, text: "Imprime los números pares del 2 al 20.", difficulty: 'Fácil' },
                        { id: 3, text: "Calcula la suma de los primeros 100 números.", difficulty: 'Fácil' },
                        { id: 4, text: "Imprime la tabla de multiplicar de un número (ej. el 5).", difficulty: 'Intermedio' },
                        { id: 5, text: "Recorre un array de nombres e imprímelos en consola.", difficulty: 'Intermedio' },
                        { id: 6, text: "Usa 'while' para una cuenta regresiva de 10 a 0.", difficulty: 'Intermedio' },
                        { id: 7, text: "Calcula el factorial de un número.", difficulty: 'Intermedio' },
                        { id: 8, text: "Imprime la secuencia de Fibonacci hasta un número N.", difficulty: 'Difícil' },
                        { id: 9, text: "Encuentra el primer número primo mayor que 100.", difficulty: 'Difícil' },
                        { id: 10, text: "Crea un patrón de asteriscos (media pirámide).", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Miércoles", title: "Listas de Datos", topics: [
                { 
                    name: "Manipulación de Arrays", color: "emerald", description: "Aprende a agregar, eliminar y modificar elementos en una lista de datos, usando métodos como .push(), .pop(), y .splice().", 
                    codeExample: "const frutas = ['Manzana', 'Banana'];\nfrutas.push('Naranja'); // Añade al final\nfrutas.pop(); // Elimina del final", 
                    exercises: [
                        { id: 1, text: "Añade un elemento al final de un array.", difficulty: 'Fácil' },
                        { id: 2, text: "Elimina el primer elemento de un array.", difficulty: 'Fácil' },
                        { id: 3, text: "Encuentra el índice de un elemento específico.", difficulty: 'Fácil' },
                        { id: 4, text: "Verifica si un elemento existe en un array.", difficulty: 'Intermedio' },
                        { id: 5, text: "Crea una copia de una porción de un array usando .slice().", difficulty: 'Intermedio' },
                        { id: 6, text: "Invierte el orden de los elementos de un array.", difficulty: 'Intermedio' },
                        { id: 7, text: "Usa .splice() para eliminar y agregar elementos en una posición específica.", difficulty: 'Intermedio' },
                        { id: 8, text: "Concatena dos arrays en uno nuevo.", difficulty: 'Difícil' },
                        { id: 9, text: "Aplana un array de arrays en un solo nivel.", difficulty: 'Difícil' },
                        { id: 10, text: "Elimina todos los elementos duplicados de un array.", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Jueves", title: "Transformar y Filtrar", topics: [
                { 
                    name: ".map()", color: "amber", description: "Transforma cada elemento de un array en algo nuevo, creando un nuevo array con los resultados sin modificar el original. Esencial en React.", 
                    codeExample: "const numeros = [1, 2, 3];\nconst dobles = numeros.map(n => n * 2);\n// dobles será [2, 4, 6]", 
                    exercises: [
                        { id: 1, text: "Dado un array de números, crea un nuevo array con cada número incrementado en 1.", difficulty: 'Fácil' },
                        { id: 2, text: "Convierte un array de strings a mayúsculas.", difficulty: 'Fácil' },
                        { id: 3, text: "Obtén un array con la longitud de cada string de otro array.", difficulty: 'Fácil' },
                        { id: 4, text: "Crea un array de booleanos que indique si cada número de otro array es par.", difficulty: 'Intermedio' },
                        { id: 5, text: "Extrae los nombres de un array de objetos de usuarios.", difficulty: 'Intermedio' },
                        { id: 6, text: "Formatea un array de objetos para que tengan una nueva estructura.", difficulty: 'Intermedio' },
                        { id: 7, text: "Crea un array de strings `<li>{item}</li>` a partir de un array de datos.", difficulty: 'Intermedio' },
                        { id: 8, text: "Calcula la raíz cuadrada de cada número en un array.", difficulty: 'Difícil' },
                        { id: 9, text: "Crea un nuevo array donde cada objeto tenga una nueva propiedad calculada.", difficulty: 'Difícil' },
                        { id: 10, text: "Implementa tu propia versión de .map() como una función.", difficulty: 'Difícil' }
                    ]
                },
                { 
                    name: ".filter()", color: "amber", description: "Crea un nuevo array con todos los elementos que cumplan una condición específica. Perfecto para búsquedas y filtrados.", 
                    codeExample: "const numeros = [1, 2, 3, 4];\nconst pares = numeros.filter(n => n % 2 === 0);\n// pares será [2, 4]", 
                    exercises: [
                        { id: 1, text: "Filtra los números mayores a 10 en un array.", difficulty: 'Fácil' },
                        { id: 2, text: "Obtén solo los strings con más de 5 caracteres.", difficulty: 'Fácil' },
                        { id: 3, text: "Elimina todos los `null` y `undefined` de un array.", difficulty: 'Fácil' },
                        { id: 4, text: "Filtra los usuarios que son mayores de edad de un array de objetos.", difficulty: 'Intermedio' },
                        { id: 5, text: "Encuentra todos los productos con un precio menor a $50.", difficulty: 'Intermedio' },
                        { id: 6, text: "Obtén solo los usuarios activos (ej. `isActive: true`).", difficulty: 'Intermedio' },
                        { id: 7, text: "Filtra palabras que empiecen con la letra 'A'.", difficulty: 'Intermedio' },
                        { id: 8, text: "Encuentra todos los números primos en un array de números.", difficulty: 'Difícil' },
                        { id: 9, text: "Filtra objetos basados en una propiedad de un array anidado.", difficulty: 'Difícil' },
                        { id: 10, text: "Implementa tu propia versión de .filter() como una función.", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Viernes", title: "Práctica y Consolidación", topics: [
                 { 
                    name: "Práctica Semanal", color: "violet", description: "Es hora de combinar todo lo aprendido: condicionales, bucles y métodos de arrays para resolver problemas más complejos.", 
                    codeExample: "function procesarUsuarios(usuarios) {\n  return usuarios\n    .filter(u => u.edad >= 18)\n    .map(u => u.nombre.toUpperCase());\n}", 
                    exercises: [
                        { id: 1, text: "Crea una función que reciba un array y devuelva solo los números pares.", difficulty: 'Fácil' },
                        { id: 2, text: "Suma todos los números de un array.", difficulty: 'Fácil' },
                        { id: 3, text: "Encuentra el string más largo en un array de strings.", difficulty: 'Fácil' },
                        { id: 4, text: "Combina .filter() y .map() para obtener los nombres de usuarios activos.", difficulty: 'Intermedio' },
                        { id: 5, text: "Cuenta cuántas veces aparece una vocal en un string.", difficulty: 'Intermedio' },
                        { id: 6, text: "Revierte un string sin usar el método .reverse().", difficulty: 'Intermedio' },
                        { id: 7, text: "Calcula el promedio de un array de números.", difficulty: 'Intermedio' },
                        { id: 8, text: "Verifica si un string es un palíndromo.", difficulty: 'Difícil' },
                        { id: 9, text: "Ordena un array de objetos por una de sus propiedades.", difficulty: 'Difícil' },
                        { id: 10, text: "Crea una función que agrupe a los usuarios por ciudad.", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Sábado", title: "Descanso y Repaso", topics: [
                { 
                    name: "Repaso Activo", color: "rose", description: "El descanso es clave para el aprendizaje. Tómate el día libre o haz un repaso ligero de los conceptos de la semana sin presión.", 
                    codeExample: "// No hay código hoy, ¡es día de descanso!\n// Tómate un café y relájate.", 
                    exercises: [
                        { id: 1, text: "Explica en voz alta qué es un bucle 'for'.", difficulty: 'Fácil' },
                        { id: 2, text: "Nombra 3 métodos de array y qué hacen.", difficulty: 'Fácil' },
                        { id: 3, text: "Escribe un ejemplo de `if/else` de memoria.", difficulty: 'Fácil' },
                        { id: 4, text: "Revisa el código que escribiste esta semana y busca mejoras.", difficulty: 'Intermedio' },
                        { id: 5, text: "Lee un artículo o mira un video corto sobre un tema de la semana.", difficulty: 'Intermedio' },
                        { id: 6, text: "Intenta resolver de nuevo el ejercicio más difícil de la semana.", difficulty: 'Intermedio' },
                        { id: 7, text: "Prepara una lista de preguntas sobre lo que no entendiste.", difficulty: 'Intermedio' },
                        { id: 8, text: "Dibuja un diagrama de flujo para un problema que resolviste.", difficulty: 'Difícil' },
                        { id: 9, text: "Escribe un pequeño resumen de lo que aprendiste esta semana.", difficulty: 'Difícil' },
                        { id: 10, text: "¡Descansa! Es el ejercicio más importante.", difficulty: 'Difícil' }
                    ]
                }
            ]},
        ],
    },
    {
        week: 2,
        title: "JavaScript Intermedio y POO",
        goal: "Conectar los fundamentos con el paradigma de Programación Orientada a Objetos para escribir código más estructurado y escalable.",
        days: [
            { day: "Lunes", title: "Sintaxis Moderna", topics: [
                { 
                    name: "Desestructuración", color: "rose", description: "Una sintaxis que permite 'desempacar' valores de arreglos o propiedades de objetos en distintas variables de forma muy limpia y concisa.", 
                    codeExample: "const usuario = { nombre: 'Ana', edad: 25 };\nconst { nombre, edad } = usuario;", 
                    exercises: [
                        { id: 1, text: "Extrae la propiedad `nombre` de un objeto.", difficulty: 'Fácil' },
                        { id: 2, text: "Obtén el primer y segundo elemento de un array.", difficulty: 'Fácil' },
                        { id: 3, text: "Asigna un alias a una propiedad extraída (ej. `nombre: userName`).", difficulty: 'Fácil' },
                        { id: 4, text: "Asigna un valor por defecto a una propiedad que no existe en el objeto.", difficulty: 'Intermedio' },
                        { id: 5, text: "Extrae propiedades de un objeto anidado.", difficulty: 'Intermedio' },
                        { id: 6, text: "Usa la desestructuración en los parámetros de una función.", difficulty: 'Intermedio' },
                        { id: 7, text: "Usa el operador `rest` (...) para obtener el resto de elementos de un array.", difficulty: 'Intermedio' },
                        { id: 8, text: "Intercambia el valor de dos variables usando desestructuración.", difficulty: 'Difícil' },
                        { id: 9, text: "Desestructura un array devuelto por una función.", difficulty: 'Difícil' },
                        { id: 10, text: "Combina la desestructuración de arrays y objetos en una sola línea.", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Martes", title: "Organización del Código", topics: [
                { 
                    name: "import / export", color: "rose", description: "Permite dividir tu código en archivos reutilizables (módulos). 'export' lo hace disponible y 'import' lo utiliza en otro archivo.", 
                    codeExample: "// utils.js\nexport const sumar = (a, b) => a + b;\n\n// main.js\nimport { sumar } from './utils.js';", 
                    exercises: [
                        { id: 1, text: "Crea una función en `math.js` y expórtala usando `export default`.", difficulty: 'Fácil' },
                        { id: 2, text: "Importa la función del ejercicio anterior en `main.js`.", difficulty: 'Fácil' },
                        { id: 3, text: "Exporta múltiples funciones desde un archivo usando `export` nombrado.", difficulty: 'Fácil' },
                        { id: 4, text: "Importa una función y asígnale un alias usando `as`.", difficulty: 'Intermedio' },
                        { id: 5, text: "Importa todo el contenido de un módulo como un solo objeto (`import * as ...`).", difficulty: 'Intermedio' },
                        { id: 6, text: "Exporta una clase desde un archivo e impórtala en otro.", difficulty: 'Intermedio' },
                        { id: 7, text: "Crea un archivo `index.js` que exporte funciones de otros archivos.", difficulty: 'Intermedio' },
                        { id: 8, text: "Explica la diferencia entre `export default` y `export` nombrado.", difficulty: 'Difícil' },
                        { id: 9, text: "Investiga y explica qué son las importaciones dinámicas (`import()`).", difficulty: 'Difícil' },
                        { id: 10, text: "Refactoriza un script largo en múltiples módulos más pequeños.", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Miércoles", title: "Modelando con Clases", topics: [
                { 
                    name: "Clases y Objetos", color: "indigo", description: "Las Clases son 'planos' para crear Objetos. Definen las propiedades y métodos que los objetos de esa clase tendrán.", 
                    codeExample: "class Mascota {\n  constructor(nombre) {\n    this.nombre = nombre;\n  }\n  saludar() {\n    return `Hola, soy ${this.nombre}`;\n  }\n}\nconst miPerro = new Mascota('Fido');", 
                    exercises: [
                        { id: 1, text: "Crea una clase `Coche` con un constructor para `marca` y `modelo`.", difficulty: 'Fácil' },
                        { id: 2, text: "Crea dos instancias (objetos) de tu clase `Coche`.", difficulty: 'Fácil' },
                        { id: 3, text: "Añade un método `mostrarInfo` a la clase `Coche`.", difficulty: 'Fácil' },
                        { id: 4, text: "Crea una clase `Rectangulo` con `ancho` y `alto` y un método `calcularArea`.", difficulty: 'Intermedio' },
                        { id: 5, text: "Crea una clase `CuentaBancaria` con un método para depositar.", difficulty: 'Intermedio' },
                        { id: 6, text: "Añade un método para retirar dinero a `CuentaBancaria`.", difficulty: 'Intermedio' },
                        { id: 7, text: "Añade una propiedad `balance` que no pueda ser negativa.", difficulty: 'Intermedio' },
                        { id: 8, text: "Crea un método estático en una clase `MathUtils` que sume dos números.", difficulty: 'Difícil' },
                        { id: 9, text: "Implementa `getters` y `setters` para una propiedad de una clase.", difficulty: 'Difícil' },
                        { id: 10, text: "Usa propiedades privadas (`#`) para encapsular el `balance` en `CuentaBancaria`.", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Jueves", title: "Reutilizando Código", topics: [
                { 
                    name: "Herencia", color: "teal", description: "Permite que una clase (hija) herede las propiedades y métodos de otra clase (padre), promoviendo la reutilización de código.", 
                    codeExample: "class Animal {\n  constructor(nombre) { this.nombre = nombre; }\n  comer() { console.log('Comiendo...'); }\n}\n\nclass Perro extends Animal {\n  ladrar() { console.log('Guau!'); }\n}", 
                    exercises: [
                        { id: 1, text: "Crea una clase `Vehiculo` y una clase `Coche` que herede de ella.", difficulty: 'Fácil' },
                        { id: 2, text: "Llama al constructor del padre usando `super()` en la clase hija.", difficulty: 'Fácil' },
                        { id: 3, text: "Crea un método en la clase hija que no exista en la padre.", difficulty: 'Fácil' },
                        { id: 4, text: "Crea una clase `Figura` con un método `calcularArea` y clases hijas `Cuadrado` y `Circulo`.", difficulty: 'Intermedio' },
                        { id: 5, text: "Sobrescribe un método de la clase padre en la clase hija.", difficulty: 'Intermedio' },
                        { id: 6, text: "Llama a un método del padre desde un método sobrescrito usando `super.metodo()`.", difficulty: 'Intermedio' },
                        { id: 7, text: "Crea una jerarquía de 3 niveles (ej. `Persona` -> `Empleado` -> `Manager`).", difficulty: 'Intermedio' },
                        { id: 8, text: "Verifica si un objeto es una instancia de una clase usando `instanceof`.", difficulty: 'Difícil' },
                        { id: 9, text: "Explica qué es el polimorfismo con un ejemplo de herencia.", difficulty: 'Difícil' },
                        { id: 10, text: "Diseña una estructura de clases para modelar diferentes tipos de cuentas en un banco.", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Viernes", title: "Práctica POO", topics: [
                 { 
                    name: "Mini-Proyecto POO", color: "violet", description: "Aplica los conceptos de Clases, Objetos y Herencia para modelar un sistema pequeño, como una biblioteca o una tienda.", 
                    codeExample: "class Tienda {\n  constructor() {\n    this.productos = [];\n  }\n  agregarProducto(producto) {\n    this.productos.push(producto);\n  }\n}", 
                    exercises: [
                        { id: 1, text: "Crea una clase base `Articulo` con `nombre` y `precio`.", difficulty: 'Fácil' },
                        { id: 2, text: "Crea clases `Libro` y `DVD` que hereden de `Articulo`.", difficulty: 'Fácil' },
                        { id: 3, text: "`Libro` debe tener `autor` y `DVD` debe tener `director`.", difficulty: 'Fácil' },
                        { id: 4, text: "Crea una clase `CarritoDeCompras`.", difficulty: 'Intermedio' },
                        { id: 5, text: "Añade un método `agregarItem` al carrito.", difficulty: 'Intermedio' },
                        { id: 6, text: "Añade un método `calcularTotal` al carrito.", difficulty: 'Intermedio' },
                        { id: 7, text: "Crea instancias de tus artículos y agrégalos al carrito.", difficulty: 'Intermedio' },
                        { id: 8, text: "Añade un método para aplicar un descuento al total.", difficulty: 'Difícil' },
                        { id: 9, text: "Implementa una forma de mostrar todos los artículos en el carrito.", difficulty: 'Difícil' },
                        { id: 10, text: "Añade un método para eliminar un ítem del carrito.", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Sábado", title: "Descanso y Repaso", topics: [
                { 
                    name: "Repaso Activo", color: "rose", description: "El descanso es clave para el aprendizaje. Tómate el día libre o haz un repaso ligero de los conceptos de la semana sin presión.", 
                    codeExample: "// No hay código hoy, ¡es día de descanso!\n// Tómate un café y relájate.", 
                    exercises: [
                        { id: 1, text: "Explica qué es una clase y qué es un objeto.", difficulty: 'Fácil' },
                        { id: 2, text: "Describe para qué sirve la palabra clave `extends`.", difficulty: 'Fácil' },
                        { id: 3, text: "¿Qué hace la desestructuración de objetos?", difficulty: 'Fácil' },
                        { id: 4, text: "Revisa el código de tu mini-proyecto y busca mejoras.", difficulty: 'Intermedio' },
                        { id: 5, text: "Lee sobre la diferencia entre composición y herencia.", difficulty: 'Intermedio' },
                        { id: 6, text: "Intenta resolver de nuevo el ejercicio más difícil de la semana.", difficulty: 'Intermedio' },
                        { id: 7, text: "Prepara una lista de preguntas sobre lo que no entendiste de POO.", difficulty: 'Intermedio' },
                        { id: 8, text: "Dibuja un diagrama de clases para el sistema que modelaste.", difficulty: 'Difícil' },
                        { id: 9, text: "Escribe un pequeño resumen de lo que aprendiste esta semana.", difficulty: 'Difícil' },
                        { id: 10, text: "¡Descansa! Es el ejercicio más importante.", difficulty: 'Difícil' }
                    ]
                }
            ]},
        ],
    },
    {
        week: 3,
        title: "¡Bienvenido a React!",
        goal: "Entrar al mundo de React, aprendiendo sus conceptos fundamentales como componentes, JSX, props y el manejo del estado.",
        days: [
            { day: "Lunes", title: "Bloques de Construcción", topics: [
                { 
                    name: "Componentes y JSX", color: "cyan", description: "Los Componentes son funciones que retornan JSX (una sintaxis similar a HTML) para describir la UI. Son la base de React.", 
                    codeExample: "function Saludo() {\n  const nombre = 'Mundo';\n  return <h1>Hola, {nombre}!</h1>;\n}", 
                    exercises: [
                        { id: 1, text: "Crea un componente `MiBoton` que renderice un elemento `<button>`.", difficulty: 'Fácil' },
                        { id: 2, text: "Renderiza tu componente `MiBoton` dentro del componente `App`.", difficulty: 'Fácil' },
                        { id: 3, text: "Usa una variable de JavaScript para mostrar tu nombre en un `<h2>`.", difficulty: 'Fácil' },
                        { id: 4, text: "Añade una clase de CSS a un elemento usando `className`.", difficulty: 'Intermedio' },
                        { id: 5, text: "Crea un componente `Cabecera` que contenga un `<h1>` y un `<p>`.", difficulty: 'Intermedio' },
                        { id: 6, text: "Renderiza una imagen (`<img>`) en un componente. Recuerda cerrar la etiqueta.", difficulty: 'Intermedio' },
                        { id: 7, text: "Usa un objeto de estilos en línea para cambiar el color de un texto.", difficulty: 'Intermedio' },
                        { id: 8, text: "Crea un componente `Layout` que renderice una `Cabecera`, un `ContenidoPrincipal` y un `PieDePagina`.", difficulty: 'Difícil' },
                        { id: 9, text: "Explica por qué los componentes deben devolver un solo elemento raíz (o un Fragmento).", difficulty: 'Difícil' },
                        { id: 10, text: "Refactoriza un bloque de HTML estático en múltiples componentes de React.", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Martes", title: "Haciendo Componentes Dinámicos", topics: [
                { 
                    name: "Props", color: "violet", description: "Las 'props' (propiedades) permiten pasar datos desde un componente padre a un componente hijo, haciéndolos dinámicos y reutilizables.", 
                    codeExample: "function Saludo(props) {\n  return <h1>Hola, {props.nombre}</h1>;\n}\n\n<Saludo nombre='Ana' />", 
                    exercises: [
                        { id: 1, text: "Pasa una prop `nombre` a un componente `Usuario` y muéstrala.", difficulty: 'Fácil' },
                        { id: 2, text: "Crea un componente `Producto` que acepte props `nombre` y `precio`.", difficulty: 'Fácil' },
                        { id: 3, text: "Usa tu componente `Producto` varias veces con diferentes datos.", difficulty: 'Fácil' },
                        { id: 4, text: "Pasa un número (ej. `edad`) como prop. Recuerda usar llaves `{}`.", difficulty: 'Intermedio' },
                        { id: 5, text: "Desestructura las props directamente en los parámetros de la función del componente.", difficulty: 'Intermedio' },
                        { id: 6, text: "Pasa una prop booleana (ej. `isLoggedIn`) a un componente.", difficulty: 'Intermedio' },
                        { id: 7, text: "Crea un componente `Avatar` que reciba una URL de imagen como prop.", difficulty: 'Intermedio' },
                        { id: 8, text: "Pasa un objeto completo como prop a un componente.", difficulty: 'Difícil' },
                        { id: 9, text: "Pasa un array como prop y renderízalo como una lista `<ul>`.", difficulty: 'Difícil' },
                        { id: 10, text: "Pasa otro componente como prop (usando `props.children`).", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Miércoles", title: "Memoria del Componente", topics: [
                { 
                    name: "useState", color: "fuchsia", description: "Un Hook de React que permite a tus componentes 'recordar' información (estado). Cuando el estado cambia, React re-renderiza el componente.", 
                    codeExample: "import { useState } from 'react';\n\nfunction Contador() {\n  const [count, setCount] = useState(0);\n  return <p>{count}</p>;\n}", 
                    exercises: [
                        { id: 1, text: "Crea un estado `count` inicializado en 0.", difficulty: 'Fácil' },
                        { id: 2, text: "Muestra el valor del estado `count` en un `<p>`.", difficulty: 'Fácil' },
                        { id: 3, text: "Crea un estado para un booleano, `isVisible`, inicializado en `true`.", difficulty: 'Fácil' },
                        { id: 4, text: "Crea un estado para un string, `texto`, que guarde el valor de un input.", difficulty: 'Intermedio' },
                        { id: 5, text: "Inicializa un estado con un objeto `{ nombre: 'Juan', edad: 20 }`.", difficulty: 'Intermedio' },
                        { id: 6, text: "Actualiza solo una propiedad del objeto de estado sin perder las otras.", difficulty: 'Intermedio' },
                        { id: 7, text: "Crea un estado que sea un array de strings.", difficulty: 'Intermedio' },
                        { id: 8, text: "Añade un nuevo elemento al array de estado.", difficulty: 'Difícil' },
                        { id: 9, text: "Elimina un elemento del array de estado por su índice.", difficulty: 'Difícil' },
                        { id: 10, text: "Usa la forma funcional de `setCount(prevCount => prevCount + 1)` para actualizar el estado.", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Jueves", title: "Interactuando con el Usuario", topics: [
                { 
                    name: "Manejo de Eventos", color: "fuchsia", description: "Permite que tus componentes reaccionen a las interacciones del usuario (clics, escritura, etc.) ejecutando funciones.", 
                    codeExample: "const [count, setCount] = useState(0);\n\nconst handleClick = () => {\n  setCount(count + 1);\n}\n\n<button onClick={handleClick}>Incrementar</button>", 
                    exercises: [
                        { id: 1, text: "Crea un botón que muestre un `alert` al hacer clic.", difficulty: 'Fácil' },
                        { id: 2, text: "Conecta un botón para que incremente un contador de estado.", difficulty: 'Fácil' },
                        { id: 3, text: "Crea un input de texto cuyo valor se guarde en el estado con `onChange`.", difficulty: 'Fácil' },
                        { id: 4, text: "Crea un botón que alterne el valor de un estado booleano.", difficulty: 'Intermedio' },
                        { id: 5, text: "Pasa una función manejadora de eventos como prop a un componente hijo.", difficulty: 'Intermedio' },
                        { id: 6, "text": "Evita el comportamiento por defecto de un formulario usando `e.preventDefault()`.", difficulty: 'Intermedio' },
                        { id: 7, "text": "Obtén el valor de un input desde el objeto evento `e`.", difficulty: 'Intermedio' },
                        { id: 8, "text": "Maneja el evento `onMouseEnter` para cambiar el estilo de un div.", difficulty: 'Difícil' },
                        { id: 9, "text": "Crea un solo manejador de eventos para múltiples inputs.", difficulty: 'Difícil' },
                        { id: 10, "text": "Pasa argumentos adicionales a un manejador de eventos.", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Viernes", title: "Mini-Proyecto: Contador", topics: [
                 { 
                    name: "Proyecto: Contador Interactivo", color: "violet", description: "Vamos a construir una pequeña aplicación de contador que combine componentes, props, estado y eventos.", 
                    codeExample: "function App() {\n  const [count, setCount] = useState(0);\n\n  const handleIncrement = () => setCount(c => c + 1);\n  const handleReset = () => setCount(0);\n\n  return <Contador count={count} onIncrement={handleIncrement} onReset={handleReset} />\n}", 
                    exercises: [
                        { id: 1, text: "Crea un componente `Display` que muestre el contador (recibido por props).", difficulty: 'Fácil' },
                        { id: 2, text: "Crea un componente `Boton` que reciba un texto y una función `onClick`.", difficulty: 'Fácil' },
                        { id: 3, text: "Mantén el estado `count` en el componente `App` principal.", difficulty: 'Fácil' },
                        { id: 4, text: "Crea botones para 'Incrementar' y 'Decrementar'.", difficulty: 'Intermedio' },
                        { id: 5, text: "Pasa las funciones para manejar el estado desde `App` a los botones.", difficulty: 'Intermedio' },
                        { id: 6, text: "Añade un botón para reiniciar el contador a 0.", difficulty: 'Intermedio' },
                        { id: 7, text: "Asegúrate de que el contador no pueda ser menor que 0.", difficulty: 'Intermedio' },
                        { id: 8, text: "Añade un input para que el usuario pueda establecer el valor del contador.", difficulty: 'Difícil' },
                        { id: 9, text: "Añade un botón para incrementar en 5.", difficulty: 'Difícil' },
                        { id: 10, text: "Estiliza la aplicación para que sea visualmente atractiva.", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Sábado", title: "Descanso y Repaso", topics: [
                { 
                    name: "Repaso Activo", color: "rose", description: "El descanso es clave para el aprendizaje. Tómate el día libre o haz un repaso ligero de los conceptos de la semana sin presión.", 
                    codeExample: "// No hay código hoy, ¡es día de descanso!\n// Tómate un café y relájate.", 
                    exercises: [
                        { id: 1, text: "Explica la diferencia entre `props` y `estado`.", difficulty: 'Fácil' },
                        { id: 2, text: "¿Qué es JSX?", difficulty: 'Fácil' },
                        { id: 3, text: "¿Para qué sirve el hook `useState`?", difficulty: 'Fácil' },
                        { id: 4, text: "Revisa el código de tu proyecto de contador y busca mejoras.", difficulty: 'Intermedio' },
                        { id: 5, text: "Lee la documentación oficial de React sobre el manejo de eventos.", difficulty: 'Intermedio' },
                        { id: 6, text: "Intenta resolver de nuevo el ejercicio más difícil de la semana.", difficulty: 'Intermedio' },
                        { id: 7, text: "Prepara una lista de preguntas sobre lo que no entendiste de React.", difficulty: 'Intermedio' },
                        { id: 8, text: "Dibuja un diagrama de cómo fluyen los datos (props y eventos) en tu app.", difficulty: 'Difícil' },
                        { id: 9, text: "Escribe un pequeño resumen de lo que aprendiste esta semana.", difficulty: 'Difícil' },
                        { id: 10, text: "¡Descansa! Es el ejercicio más importante.", difficulty: 'Difícil' }
                    ]
                }
            ]},
        ],
    },
    {
        week: 4,
        title: "React Avanzado y Hooks",
        goal: "Profundizar en las herramientas que usarás en el 90% de tus proyectos de React, dominando hooks esenciales y el renderizado.",
        days: [
            { day: "Lunes", title: "Mostrando Listas de Datos", topics: [
                { 
                    name: "Renderizado de Listas", color: "lime", description: "Usa el método `.map()` para transformar un array de datos en una lista de elementos de React. Es crucial para mostrar datos dinámicos.", 
                    codeExample: "const items = ['Manzana', 'Pera', 'Naranja'];\nreturn (\n  <ul>\n    {items.map(item => <li key={item}>{item}</li>)}\n  </ul>\n);", 
                    exercises: [
                        { id: 1, text: "Renderiza un array de números dentro de una lista `<ul>`.", difficulty: 'Fácil' },
                        { id: 2, text: "Asegúrate de que cada elemento `<li>` tenga una prop `key` única.", difficulty: 'Fácil' },
                        { id: 3, text: "Renderiza un array de objetos, mostrando una propiedad de cada objeto.", difficulty: 'Fácil' },
                        { id: 4, text: "Crea un componente `ListaDeTareas` que renderice un array de tareas.", difficulty: 'Intermedio' },
                        { id: 5, text: "Pasa el array de tareas como una prop al componente.", difficulty: 'Intermedio' },
                        { id: 6, text: "Filtra la lista antes de renderizarla (ej. mostrar solo tareas completadas).", difficulty: 'Intermedio' },
                        { id: 7, text: "Usa el índice del array como `key` y explica por qué no siempre es ideal.", difficulty: 'Intermedio' },
                        { id: 8, text: "Renderiza una tabla (`<table>`) a partir de un array de objetos.", difficulty: 'Difícil' },
                        { id: 9, text: "Renderiza una lista de componentes personalizados en lugar de `<li>`.", difficulty: 'Difícil' },
                        { id: 10, text: "Crea una lista anidada (una lista dentro de otra).", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Martes", title: "UI Dinámica", topics: [
                { 
                    name: "Renderizado Condicional", color: "lime", description: "Permite mostrar diferentes elementos o componentes basados en ciertas condiciones, como el estado o las props.", 
                    codeExample: "const isLoggedIn = true;\nreturn (\n  <div>\n    {isLoggedIn ? <p>Bienvenido!</p> : <p>Por favor, inicia sesión.</p>}\n  </div>\n);", 
                    exercises: [
                        { id: 1, text: "Usa un operador ternario para mostrar 'Hola' o 'Adiós' según un estado.", difficulty: 'Fácil' },
                        { id: 2, text: "Muestra un componente `LoadingSpinner` mientras un estado `isLoading` sea `true`.", difficulty: 'Fácil' },
                        { id: 3, text: "Usa el operador `&&` para mostrar un mensaje de `novedades` solo si existe.", difficulty: 'Fácil' },
                        { id: 4, text: "Crea un botón que muestre u oculte un párrafo de texto.", difficulty: 'Intermedio' },
                        { id: 5, text: "Muestra un mensaje de 'No hay resultados' si un array está vacío.", difficulty: 'Intermedio' },
                        { id: 6, text: "Devuelve `null` desde un componente para no renderizar nada.", difficulty: 'Intermedio' },
                        { id: 7, text: "Usa una sentencia `if/else` al inicio de tu componente para devolver diferente JSX.", difficulty: 'Intermedio' },
                        { id: 8, text: "Crea un componente `Tab` que muestre diferente contenido según la pestaña activa.", difficulty: 'Difícil' },
                        { id: 9, text: "Combina renderizado condicional con renderizado de listas.", difficulty: 'Difícil' },
                        { id: 10, text: "Implementa un sistema simple de rutas que muestre diferentes 'páginas' (componentes) según una variable de estado.", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Miércoles", title: "Efectos Secundarios", topics: [
                { 
                    name: "useEffect", color: "orange", description: "Un Hook que te permite realizar 'efectos secundarios' en componentes, como peticiones a APIs, suscripciones o manipular el DOM directamente.", 
                    codeExample: "useEffect(() => {\n  // Se ejecuta después de que el componente se monta\n  document.title = `Has hecho clic ${count} veces`;\n}, [count]); // Se vuelve a ejecutar solo si 'count' cambia", 
                    exercises: [
                        { id: 1, text: "Muestra un mensaje en consola cuando un componente se monta por primera vez.", difficulty: 'Fácil' },
                        { id: 2, text: "Actualiza el título del documento (`document.title`) con el valor de un contador.", difficulty: 'Fácil' },
                        { id: 3, text: "Simula una petición a una API con `setTimeout` dentro de un `useEffect`.", difficulty: 'Fácil' },
                        { id: 4, text: "Añade el array de dependencias correcto para que el efecto se ejecute solo una vez.", difficulty: 'Intermedio' },
                        { id: 5, text: "Haz que el efecto se vuelva a ejecutar cuando una prop específica cambie.", difficulty: 'Intermedio' },
                        { id: 6, "text": "Crea un `useEffect` que 'escuche' el evento de resize de la ventana.", difficulty: 'Intermedio' },
                        { id: 7, "text": "Implementa la función de limpieza para remover el event listener cuando el componente se desmonte.", difficulty: 'Intermedio' },
                        { id: 8, "text": "Crea un `useEffect` que haga una petición `fetch` a una API real.", difficulty: 'Difícil' },
                        { id: 9, "text": "Maneja los estados de `loading` y `error` dentro del `useEffect`.", difficulty: 'Difícil' },
                        { id: 10, "text": "Crea un custom hook (ej. `useFetch`) que encapsule la lógica de `useEffect`.", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Jueves", title: "Levantamiento de Estado", topics: [
                { 
                    name: "State Lifting", color: "orange", description: "Es el patrón de mover el estado a un componente ancestro común para que múltiples componentes hijos puedan compartirlo y modificarlo.", 
                    codeExample: "// Padre\nconst [value, setValue] = useState('');\n\n// Hijo A\n<Input value={value} onChange={setValue} />\n\n// Hijo B\n<Display value={value} />", 
                    exercises: [
                        { id: 1, text: "Identifica en una app dos componentes hermanos que necesiten el mismo dato.", difficulty: 'Fácil' },
                        { id: 2, text: "Mueve el estado del hijo al padre más cercano.", difficulty: 'Fácil' },
                        { id: 3, text: "Pasa el estado como prop del padre al hijo.", difficulty: 'Fácil' },
                        { id: 4, text: "Pasa la función para actualizar el estado como prop del padre al hijo.", difficulty: 'Intermedio' },
                        { id: 5, text: "Crea una app con un input y un párrafo que muestre el texto en tiempo real.", difficulty: 'Intermedio' },
                        { id: 6, text: "Haz que un botón en un componente `Header` modifique el contenido de un componente `Main`.", difficulty: 'Intermedio' },
                        { id: 7, text: "Refactoriza una app para que toda la lógica de estado resida en el componente `App`.", difficulty: 'Intermedio' },
                        { id: 8, text: "Crea un conversor de temperatura (Celsius a Fahrenheit) con dos inputs sincronizados.", difficulty: 'Difícil' },
                        { id: 9, text: "Explica por qué 'levantar el estado' es preferible a sincronizar estados entre hijos.", difficulty: 'Difícil' },
                        { id: 10, text: "Implementa un filtro en una lista de productos. El estado del filtro está en el padre.", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Viernes", title: "Mini-Proyecto: To-Do App", topics: [
                 { 
                    name: "Proyecto: Lista de Tareas", color: "violet", description: "Construye la aplicación clásica 'To-Do list' para practicar el manejo de listas, el estado de arrays y los formularios.", 
                    codeExample: "const [todos, setTodos] = useState([]);\nconst [newTodo, setNewTodo] = useState('');\n\nconst handleAddTodo = () => {\n  setTodos([...todos, { id: Date.now(), text: newTodo, done: false }]);\n  setNewTodo('');\n}", 
                    exercises: [
                        { id: 1, text: "Crea un estado para guardar el array de tareas.", difficulty: 'Fácil' },
                        { id: 2, text: "Renderiza la lista de tareas.", difficulty: 'Fácil' },
                        { id: 3, text: "Crea un formulario con un input para añadir nuevas tareas.", difficulty: 'Fácil' },
                        { id: 4, text: "Guarda el valor del input en un estado.", difficulty: 'Intermedio' },
                        { id: 5, text: "Implementa la función para añadir una nueva tarea al array.", difficulty: 'Intermedio' },
                        { id: 6, text: "Limpia el input después de añadir una tarea.", difficulty: 'Intermedio' },
                        { id: 7, text: "Añade una funcionalidad para eliminar una tarea.", difficulty: 'Intermedio' },
                        { id: 8, text: "Implementa un checkbox para marcar una tarea como completada.", difficulty: 'Difícil' },
                        { id: 9, text: "Estiliza las tareas completadas de forma diferente (ej. tachado).", difficulty: 'Difícil' },
                        { id: 10, text: "Añade un contador que muestre cuántas tareas quedan por hacer.", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Sábado", title: "Descanso y Repaso", topics: [
                { 
                    name: "Repaso Activo", color: "rose", description: "El descanso es clave para el aprendizaje. Tómate el día libre o haz un repaso ligero de los conceptos de la semana sin presión.", 
                    codeExample: "// No hay código hoy, ¡es día de descanso!\n// Tómate un café y relájate.", 
                    exercises: [
                        { id: 1, text: "Explica para qué sirve la prop `key` al renderizar listas.", difficulty: 'Fácil' },
                        { id: 2, text: "Nombra 2 formas de hacer renderizado condicional.", difficulty: 'Fácil' },
                        { id: 3, text: "¿Cuándo se ejecuta un `useEffect` con un array de dependencias vacío?", difficulty: 'Fácil' },
                        { id: 4, text: "Revisa el código de tu To-Do App y busca mejoras.", difficulty: 'Intermedio' },
                        { id: 5, text: "Lee la documentación oficial de React sobre el hook `useEffect`.", difficulty: 'Intermedio' },
                        { id: 6, text: "Intenta resolver de nuevo el ejercicio más difícil de la semana.", difficulty: 'Intermedio' },
                        { id: 7, text: "Prepara una lista de preguntas sobre lo que no entendiste de los Hooks.", difficulty: 'Intermedio' },
                        { id: 8, text: "Dibuja un diagrama del ciclo de vida de un componente y dónde encaja `useEffect`.", difficulty: 'Difícil' },
                        { id: 9, text: "Escribe un pequeño resumen de lo que aprendiste esta semana.", difficulty: 'Difícil' },
                        { id: 10, text: "¡Descansa! Es el ejercicio más importante.", difficulty: 'Difícil' }
                    ]
                }
            ]},
        ],
    },
    {
        week: 5,
        title: "El Poder de TypeScript + React",
        goal: "Integrar TypeScript para hacer tus aplicaciones más robustas, seguras y fáciles de mantener a largo plazo.",
        days: [
            { day: "Lunes", title: "Tipos y Contratos", topics: [
                { 
                    name: "Tipos e Interfaces", color: "red", description: "TypeScript añade un sistema de tipos para JavaScript. Usa `type` e `interface` para definir la 'forma' de tus datos.", 
                    codeExample: "interface Usuario {\n  id: number;\n  nombre: string;\n  activo?: boolean; // Opcional\n}\n\nconst user: Usuario = { id: 1, nombre: 'Ana' };", 
                    exercises: [
                        { id: 1, text: "Crea una variable `nombre` y dale el tipo `string`.", difficulty: 'Fácil' },
                        { id: 2, text: "Define una función que acepte dos números y devuelva un número.", difficulty: 'Fácil' },
                        { id: 3, text: "Crea una interfaz `IProducto` con `nombre` (string) y `precio` (number).", difficulty: 'Fácil' },
                        { id: 4, text: "Define un tipo para un array de strings (`string[]`).", difficulty: 'Intermedio' },
                        { id: 5, text: "Crea una interfaz con una propiedad opcional.", difficulty: 'Intermedio' },
                        { id: 6, text: "Usa un 'union type' para una variable que puede ser `string | number`.", difficulty: 'Intermedio' },
                        { id: 7, text: "Crea un 'type alias' para un tipo complejo.", difficulty: 'Intermedio' },
                        { id: 8, text: "Define el tipo para una función que no devuelve nada (`void`).", difficulty: 'Difícil' },
                        { id: 9, text: "Usa `extends` en una interfaz para heredar propiedades de otra.", difficulty: 'Difícil' },
                        { id: 10, text: "Crea un tipo genérico simple para una función.", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Martes", title: "Tipando en React", topics: [
                { 
                    name: "Tipar Props", color: "green", description: "Define explícitamente qué props espera un componente y de qué tipo son. Es la principal ventaja de usar TS con React.", 
                    codeExample: "interface SaludoProps {\n  nombre: string;\n}\n\nconst Saludo: React.FC<SaludoProps> = ({ nombre }) => {\n  return <h1>Hola, {nombre}</h1>;\n}", 
                    exercises: [
                        { id: 1, text: "Tipa las props de un componente `Boton` que recibe un `texto` (string).", difficulty: 'Fácil' },
                        { id: 2, text: "Usa `React.FC` para tipar un componente funcional.", difficulty: 'Fácil' },
                        { id: 3, text: "Crea una interfaz para las props de un componente `PerfilUsuario`.", difficulty: 'Fácil' },
                        { id: 4, text: "Tipa una prop que es un array de objetos.", difficulty: 'Intermedio' },
                        { id: 5, text: "Tipa la prop especial `children`.", difficulty: 'Intermedio' },
                        { id: 6, text: "Tipa una prop que es una función (callback), ej. `onClick: () => void`.", difficulty: 'Intermedio' },
                        { id: 7, text: "Usa un 'enum' para una prop que solo puede tener ciertos valores.", difficulty: 'Intermedio' },
                        { id: 8, text: "Tipa las props de un componente que renderiza sus `children`.", difficulty: 'Difícil' },
                        { id: 9, text: "Usa 'Utility Types' como `Partial` u `Omit` en tus tipos de props.", difficulty: 'Difícil' },
                        { id: 10, text: "Crea un componente genérico y tipa sus props.", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Miércoles", title: "Tipando Estado y Eventos", topics: [
                { 
                    name: "Tipar Hooks y Eventos", color: "green", description: "Añade tipos a los hooks como `useState` y a los manejadores de eventos para mejorar la seguridad y el autocompletado.", 
                    codeExample: "const [count, setCount] = useState<number>(0);\nconst handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n  setText(e.target.value);\n};", 
                    exercises: [
                        { id: 1, text: "Tipa un `useState` para un contador (number).", difficulty: 'Fácil' },
                        { id: 2, text: "Tipa un `useState` para un string.", difficulty: 'Fácil' },
                        { id: 3, text: "Tipa un `useState` para un booleano.", difficulty: 'Fácil' },
                        { id: 4, text: "Tipa un `useState` que puede ser un objeto `IUsuario` o `null`.", difficulty: 'Intermedio' },
                        { id: 5, text: "Tipa el evento (`e`) en un manejador `onChange` de un input.", difficulty: 'Intermedio' },
                        { id: 6, text: "Tipa un `useState` que maneja un array de strings.", difficulty: 'Intermedio' },
                        { id: 7, text: "Tipa el evento de clic de un botón (`React.MouseEvent`).", difficulty: 'Intermedio' },
                        { id: 8, text: "Tipa un `useRef` que se adjuntará a un elemento `HTMLDivElement`.", difficulty: 'Difícil' },
                        { id: 9, text: "Tipa un `useState` con un tipo complejo (array de objetos).", difficulty: 'Difícil' },
                        { id: 10, text: "Tipa el estado y la acción de un hook `useReducer`.", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Jueves", title: "Proyecto: Refactor a TS", topics: [
                 { 
                    name: "Refactorizar a TypeScript", color: "violet", description: "Toma un proyecto existente de JavaScript (como tu To-Do App) y añadele tipos de TypeScript de forma incremental.", 
                    codeExample: "// Antes\nconst TodoItem = ({ todo }) => { ... }\n\n// Después\ninterface ITodo { id: number; text: string; done: boolean; }\ninterface TodoItemProps { todo: ITodo; }\nconst TodoItem: React.FC<TodoItemProps> = ({ todo }) => { ... }", 
                    exercises: [
                        { id: 1, text: "Crea una interfaz `ITodo` para la forma de tus tareas.", difficulty: 'Fácil' },
                        { id: 2, text: "Tipa el estado `todos` como un array de `ITodo`.", difficulty: 'Fácil' },
                        { id: 3, text: "Tipa el estado `newTodo` como un `string`.", difficulty: 'Fácil' },
                        { id: 4, text: "Crea un componente `TodoList` y tipa sus props (debe recibir el array de todos).", difficulty: 'Intermedio' },
                        { id: 5, text: "Crea un componente `TodoItem` y tipa sus props.", difficulty: 'Intermedio' },
                        { id: 6, text: "Tipa las funciones que se pasan como props (ej. `onDelete`, `onToggle`).", difficulty: 'Intermedio' },
                        { id: 7, text: "Tipa todos los eventos de los formularios y botones.", difficulty: 'Intermedio' },
                        { id: 8, text: "Activa la opción `strict` en tu `tsconfig.json` y arregla los errores.", difficulty: 'Difícil' },
                        { id: 9, text: "Crea un tipo para el estado del filtro ('all', 'active', 'completed').", difficulty: 'Difícil' },
                        { id: 10, text: "Asegúrate de que no quede ningún `any` implícito en tu código.", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Viernes", title: "Proyecto Final", topics: [
                 { 
                    name: "¡A Construir!", color: "violet", description: "Es hora de crear una aplicación pequeña desde cero usando React y TypeScript. ¡Elige un tema que te apasione!", 
                    codeExample: "// API Sugerida: The Movie Database (TMDb), GIPHY, PokeAPI\n\n// Estructura tu proyecto:\n// - src/components\n// - src/hooks\n// - src/types.ts", 
                    exercises: [
                        { id: 1, text: "Elige una API pública para tu proyecto.", difficulty: 'Fácil' },
                        { id: 2, text: "Define las interfaces de TypeScript para los datos de la API.", difficulty: 'Fácil' },
                        { id: 3, text: "Crea la estructura de carpetas de tu proyecto.", difficulty: 'Fácil' },
                        { id: 4, text: "Crea un componente para buscar (un input y un botón).", difficulty: 'Intermedio' },
                        { id: 5, text: "Crea un componente para mostrar una lista de resultados.", difficulty: 'Intermedio' },
                        { id: 6, text: "Crea un componente para mostrar el detalle de un resultado.", difficulty: 'Intermedio' },
                        { id: 7, text: "Usa `useEffect` para llamar a la API cuando el término de búsqueda cambie.", difficulty: 'Intermedio' },
                        { id: 8, text: "Maneja los estados de carga y error.", difficulty: 'Difícil' },
                        { id: 9, text: "Implementa algún tipo de paginación o 'cargar más'.", difficulty: 'Difícil' },
                        { id: 10, text: "Despliega tu aplicación en un servicio como Netlify o Vercel.", difficulty: 'Difícil' }
                    ]
                }
            ]},
            { day: "Sábado", title: "¡Felicitaciones!", topics: [
                { 
                    name: "Revisión y Siguientes Pasos", color: "rose", description: "Has completado un viaje increíble. Tómate un momento para apreciar tu progreso y pensar en lo que viene.", 
                    codeExample: "// Has llegado muy lejos. ¡Felicidades!\nconsole.log('¡Sigue aprendiendo!');", 
                    exercises: [
                        { id: 1, text: "Revisa tu proyecto final y anota 3 cosas que mejorarías.", difficulty: 'Fácil' },
                        { id: 2, text: "Comparte tu proyecto con alguien.", difficulty: 'Fácil' },
                        { id: 3, text: "Escribe una publicación en LinkedIn o un blog sobre tu experiencia de aprendizaje.", difficulty: 'Fácil' },
                        { id: 4, text: "Investiga sobre React Router para la navegación.", difficulty: 'Intermedio' },
                        { id: 5, text: "Busca información sobre un gestor de estado como Zustand o Redux Toolkit.", difficulty: 'Intermedio' },
                        { id: 6, text: "Explora una librería de componentes como Shadcn/ui o Material-UI.", difficulty: 'Intermedio' },
                        { id: 7, text: "Aprende sobre Next.js, el framework de React.", difficulty: 'Intermedio' },
                        { id: 8, text: "Contribuye a un proyecto de código abierto, aunque sea una corrección pequeña.", difficulty: 'Difícil' },
                        { id: 9, text: "Empieza a construir un portafolio para mostrar tus proyectos.", difficulty: 'Difícil' },
                        { id: 10, text: "¡Celébralo! Te lo has ganado.", difficulty: 'Difícil' }
                    ]
                }
            ]},
        ],
    },
];

// Estado para los datos del plan (para poder actualizarlo si fuera necesario en el futuro)
const useStudyPlanData = () => {
    const [planData] = useState(studyPlanData);
    // Aquí se podría agregar lógica para cargar/guardar el progreso en el futuro
    return [planData];
};


// --- HOOK PERSONALIZADO PARA ANIMACIONES ---
const useInView = (options: IntersectionObserverInit = {}): [React.RefObject<HTMLDivElement | null>, boolean] => {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, isInView];
};


// --- COMPONENTES DE LA UI ---

const AnimatedInView: FC<{ children: ReactNode; className?: string; delay?: string }> = ({ children, className, delay = '0s' }) => {
    const [ref, isInView] = useInView({ threshold: 0.1 });
    const style = { animationDelay: delay };
    return (
        <div ref={ref} style={style} className={`${className} ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {children}
        </div>
    );
};

// Píldora para cada tema individual
type TopicColor =
    | 'sky'
    | 'emerald'
    | 'amber'
    | 'rose'
    | 'indigo'
    | 'teal'
    | 'cyan'
    | 'violet'
    | 'fuchsia'
    | 'lime'
    | 'orange'
    | 'red'
    | 'blue'
    | 'green';

const TopicPill: FC<Omit<ITopic, 'description' | 'codeExample' | 'exercises'> & { onClick: () => void; color: TopicColor }> = ({ name, color, onClick }) => {
    const colorClasses: Record<TopicColor, string> = {
        sky: 'bg-sky-500/10 text-sky-400 ring-sky-500/20 hover:bg-sky-500/20',
        emerald: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20 hover:bg-emerald-500/20',
        amber: 'bg-amber-500/10 text-amber-400 ring-amber-500/20 hover:bg-amber-500/20',
        rose: 'bg-rose-500/10 text-rose-400 ring-rose-500/20 hover:bg-rose-500/20',
        indigo: 'bg-indigo-500/10 text-indigo-400 ring-indigo-500/20 hover:bg-indigo-500/20',
        teal: 'bg-teal-500/10 text-teal-400 ring-teal-500/20 hover:bg-teal-500/20',
        cyan: 'bg-cyan-500/10 text-cyan-400 ring-cyan-500/20 hover:bg-cyan-500/20',
        violet: 'bg-violet-500/10 text-violet-400 ring-violet-500/20 hover:bg-violet-500/20',
        fuchsia: 'bg-fuchsia-500/10 text-fuchsia-400 ring-fuchsia-500/20 hover:bg-fuchsia-500/20',
        lime: 'bg-lime-500/10 text-lime-400 ring-lime-500/20 hover:bg-lime-500/20',
        orange: 'bg-orange-500/10 text-orange-400 ring-orange-500/20 hover:bg-orange-500/20',
        red: 'bg-red-500/10 text-red-400 ring-red-500/20 hover:bg-red-500/20',
        blue: 'bg-blue-500/10 text-blue-400 ring-blue-500/20 hover:bg-blue-500/20',
        green: 'bg-green-500/10 text-green-400 ring-green-500/20 hover:bg-green-500/20',
    };

    return (
        <button onClick={onClick} className={`text-left inline-block px-3 py-1 text-sm font-medium rounded-full ring-1 ring-inset transition-all duration-300 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${colorClasses[color]}`}>
            {name}
        </button>
    );
};

// Tarjeta para mostrar el plan de un día
const DayCard: FC<IDay & { index: number; onTopicClick: (topic: ITopic) => void }> = ({ day, title, topics, index, onTopicClick }) => (
    <AnimatedInView className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm" delay={`${index * 100}ms`}>
        <p className="text-sm font-bold text-violet-400">{day}</p>
        <h4 className="font-semibold text-white mt-1">{title}</h4>
        <div className="flex flex-wrap gap-2 mt-3">
            {topics.map(topic => <TopicPill key={topic.name} name={topic.name} color={topic.color} onClick={() => onTopicClick(topic)} />)}
        </div>
    </AnimatedInView>
);

// Componente principal para una semana del plan
const WeekCard: FC<IWeek & { onTopicClick: (topic: ITopic) => void }> = ({ week, title, goal, days, onTopicClick }) => {
    return (
        <div className="relative pl-12 pb-12">
            <div className="absolute left-0 top-1 w-8 h-8 bg-gray-800 border-2 border-violet-500 rounded-full flex items-center justify-center">
                <span className="font-bold text-violet-400">{week}</span>
                 <div className="absolute top-0 left-1/2 w-4 h-4 bg-violet-500 rounded-full animate-ping-slow"></div>
            </div>
            <div className="absolute left-[15px] top-10 h-full w-0.5 bg-gray-700"></div>
            
            <AnimatedInView>
                 <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{title}</h2>
                 <p className="mt-2 text-gray-400 max-w-2xl">{goal}</p>
            </AnimatedInView>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {days.map((day, index) => <DayCard key={day.day + day.title} {...day} index={index} onTopicClick={onTopicClick} />)}
            </div>
        </div>
    );
};

// --- SUB-COMPONENTES DEL MODAL ---

// Badge para la dificultad del ejercicio
const DifficultyBadge: FC<{ difficulty: IExercise['difficulty'] }> = ({ difficulty }) => {
    const colors = {
        Fácil: 'bg-green-500/10 text-green-400',
        Intermedio: 'bg-amber-500/10 text-amber-400',
        Difícil: 'bg-red-500/10 text-red-400',
    };
    return <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${colors[difficulty]}`}>{difficulty}</span>;
};

// Un item de la lista de ejercicios
const ExerciseItem: FC<{ exercise: IExercise; isCompleted: boolean; onToggle: () => void }> = ({ exercise, isCompleted, onToggle }) => (
    <div 
        className="flex items-start gap-3 p-3 -mx-3 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
        onClick={onToggle}
    >
        <input 
            type="checkbox"
            checked={isCompleted}
            readOnly
            className="mt-1 form-checkbox h-5 w-5 rounded bg-gray-700 border-gray-600 text-violet-500 focus:ring-violet-500 cursor-pointer"
        />
        <div className="flex-1">
            <p className={`transition-colors ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                {exercise.text}
            </p>
        </div>
        <DifficultyBadge difficulty={exercise.difficulty} />
    </div>
);

// --- COMPONENTE DEL MODAL ---
const TopicModal: FC<{ topic: ITopic | null; onClose: () => void }> = ({ topic, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());
    
    // Reinicia el estado de los ejercicios completados cuando el tema cambia
    useEffect(() => {
        setCompletedExercises(new Set());
    }, [topic]);

    const handleToggleExercise = (exerciseId: number) => {
        setCompletedExercises(prev => {
            const newSet = new Set(prev);
            if (newSet.has(exerciseId)) {
                newSet.delete(exerciseId);
            } else {
                newSet.add(exerciseId);
            }
            return newSet;
        });
    };
    
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 300);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!topic) return null;

    const modalAnimation = isClosing ? 'animate-fade-out' : 'animate-fade-in';
    const cardAnimation = isClosing ? 'animate-scale-out' : 'animate-scale-in';

    const groupedExercises = topic.exercises.reduce((acc, ex) => {
        const difficulty = ex.difficulty;
        if (!acc[difficulty]) {
            acc[difficulty] = [];
        }
        acc[difficulty].push(ex);
        return acc;
    }, {} as Record<IExercise['difficulty'], IExercise[]>);

    return (
        <div className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 ${modalAnimation}`} onClick={handleClose}>
            <div className={`relative w-full max-w-2xl bg-gray-900 rounded-xl border border-gray-700 shadow-2xl shadow-violet-500/10 p-6 md:p-8 ${cardAnimation} flex flex-col max-h-[90vh]`} onClick={(e) => e.stopPropagation()}>
                <div className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-${topic.color}-500/20 to-transparent rounded-t-xl z-0`}></div>
                <div className="relative z-10 flex-shrink-0">
                    <button onClick={handleClose} className="absolute top-0 right-0 text-gray-500 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <h3 className="text-2xl font-bold text-white">{topic.name}</h3>
                </div>
                <div className="relative z-10 overflow-y-auto mt-4 pr-2 flex-grow">
                    <p className="text-gray-400 text-lg leading-relaxed">{topic.description}</p>
                    <h4 className="font-semibold text-white mt-6 mb-2">Ejemplo de Código:</h4>
                    <pre className="bg-gray-800/70 p-4 rounded-lg text-sm text-cyan-300 overflow-x-auto"><code>{topic.codeExample}</code></pre>
                    <h4 className="font-semibold text-white mt-6 mb-2">Ejercicios Prácticos ({completedExercises.size}/{topic.exercises.length} completados):</h4>
                    <div className="space-y-4">
                        {(['Fácil', 'Intermedio', 'Difícil'] as const).map(difficulty => (
                            groupedExercises[difficulty] && (
                                <div key={difficulty}>
                                    <h5 className="font-semibold text-violet-400 mb-2">{difficulty}</h5>
                                    <div className="space-y-1">
                                        {groupedExercises[difficulty].map(ex => (
                                            <ExerciseItem key={ex.id} exercise={ex} isCompleted={completedExercises.has(ex.id)} onToggle={() => handleToggleExercise(ex.id)} />
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Componente principal de la aplicación
export default function StudyPlan() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [modalContent, setModalContent] = useState<ITopic | null>(null);
    const [planData] = useStudyPlanData(); // Usa el hook para los datos

    const handleTopicClick = (topic: ITopic) => {
        setModalContent(topic);
    };

    const handleCloseModal = () => {
        setModalContent(null);
    };

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <style>{`
                /* ... (Estilos y animaciones existentes) ... */
                @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
                @keyframes text-pan { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
                .animated-text-gradient { background: linear-gradient(90deg, #a78bfa, #f472b6, #60a5fa, #a78bfa); background-size: 200% auto; color: transparent; -webkit-background-clip: text; background-clip: text; animation: text-pan 5s linear infinite; }
                @keyframes ping-slow { 75%, 100% { transform: scale(2.5); opacity: 0; } }
                .animate-ping-slow { animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                @keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }
                .animate-fade-out { animation: fade-out 0.3s ease-in forwards; }
                @keyframes scale-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
                @keyframes scale-out { from { transform: scale(1); opacity: 1; } to { transform: scale(0.95); opacity: 0; } }
                .animate-scale-out { animation: scale-out 0.3s ease-in forwards; }
                .form-checkbox { -webkit-appearance: none; -moz-appearance: none; appearance: none; padding: 0; -webkit-print-color-adjust: exact; color-adjust: exact; display: inline-block; vertical-align: middle; background-origin: border-box; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; flex-shrink: 0; height: 1.25rem; width: 1.25rem; }
            `}</style>
            <div className="fixed top-0 left-0 w-full h-1.5 z-50">
                <div className="h-full bg-violet-500 transition-all duration-300" style={{ width: `${scrollProgress}%` }}></div>
            </div>
            <main className="bg-gray-900 min-h-screen text-gray-200 font-sans p-4 md:p-8">
                <div className="max-w-5xl mx-auto">
                    <header className="text-center py-16">
                        <AnimatedInView>
                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">
                                Tu Ruta de Aprendizaje a <br />
                                <span className="animated-text-gradient">React & TypeScript</span>
                            </h1>
                        </AnimatedInView>
                        <AnimatedInView delay="200ms">
                            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                                Un plan de 5 semanas para llevarte de cero a héroe. Sigue esta línea de tiempo interactiva y convierte tus metas en realidad.
                            </p>
                        </AnimatedInView>
                    </header>
                    <div className="relative">
                         <div className="absolute left-[15px] top-0 h-full w-0.5 bg-gray-700 hidden md:block"></div>
                        {planData.map(week => <WeekCard key={week.week} {...week} onTopicClick={handleTopicClick} />)}
                    </div>
                     <footer className="text-center py-12 text-gray-500">
                        <p>Creado para acelerar tu viaje en el desarrollo web.</p>
                        <p>¡Mucho éxito!</p>
                    </footer>
                </div>
            </main>
            <TopicModal topic={modalContent} onClose={handleCloseModal} />
        </>
    );
}

