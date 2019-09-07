
// Mis funciones

function sumarDineroACuenta(monto)
{
    saldoCuenta += monto;
}

function restarDineroACuenta(monto)
{
    saldoCuenta -= monto;
}

function verificarInputDelUsuario(input)
{
    if (input === null)
    {
        return false;
    }     
    else if (isNaN(parseInt(input)))
    {
        alert('¡El valor ingresado no es un número!');
        return false;
    }  
    else if (parseInt(input) < 0)
    {
        alert('¡No puede ingresar valores negativos!');
        return false;
    }

    return true;
}

//Declaración de variables
var nombreUsuario = "Franco Palermo";
var saldoCuenta = 20000;
var limiteExtraccion = 11000;
var codigoSeguridad = 1234;

// Servicios
var agua = 350;
var telefono = 425;
var luz = 210;
var internet = 570;

// Cuentas amigas
var cuentasAmigas = [1234567, 7654321];

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}


//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    var input = prompt('Ingrese el nuevo límite de extraccion', limiteExtraccion);

    if (!verificarInputDelUsuario(input)) return;

    var nuevoLimiteDeExtraccion = parseInt(input);

    limiteExtraccion = nuevoLimiteDeExtraccion;

    actualizarLimiteEnPantalla();

    alert('El nuevo límite de extracción es de $' + nuevoLimiteDeExtraccion);
}

function extraerDinero() {
    var input = prompt('Ingrese la cantidad de dinero que desea extraer');

    if (!verificarInputDelUsuario(input)) return;

    var montoAExtraer = parseInt(input);

    if (montoAExtraer > saldoCuenta)
    {
        alert('¡No puede extraer más dinero del que posee en la cuenta!');
    }
    else if (montoAExtraer > limiteExtraccion)
    {
        alert('¡El monto ingresado supera al establecido por el límite de extracción!');
    }
    else if (montoAExtraer % 100 !== 0)
    {
        alert('¡Sólo puede realizar extracciones cuyo monto sean múltiplos de 100!');
    }
    else 
    {
        var saldoAnterior = saldoCuenta;    

        restarDineroACuenta(montoAExtraer);
    
        actualizarSaldoEnPantalla();    
    
        alert('Se han extraído: $' + montoAExtraer + '\n' +
            'Saldo anterior: $' + saldoAnterior + '\n' +
            'Saldo actual: $' + saldoCuenta);
    }
}

function depositarDinero() {
    var input = prompt('Ingrese la cantidad de dinero que desea depositar');

    if (!verificarInputDelUsuario(input)) return;

    var montoADepositar = parseInt(input);

    var saldoAnterior = saldoCuenta;

    sumarDineroACuenta(montoADepositar);

    actualizarSaldoEnPantalla();    

    alert('Se han depositado: $' + montoADepositar + '\n' +
        'Saldo anterior: $' + saldoAnterior + '\n' +
        'Saldo actual: $' + saldoCuenta);
}

function pagarServicio() {
    var input = prompt('Ingrese el número que corresponda con el servicio que quiere pagar\n' +
        '1 - Agua\n' +
        '2 - Luz\n' +
        '3 - Internet\n' +
        '4 - Teléfono');

    if (!verificarInputDelUsuario(input)) return;

    var servicioAPagar = parseInt(input);

    var saldoAnterior = saldoCuenta;
    var resultado = saldoCuenta;
    var nombreServicio = '';
    var esUnServicioValido = true;

    switch (servicioAPagar)
    {
        case 1:
            resultado -= agua;
            nombreServicio = "Agua";
            break;
        case 2:
            resultado -= luz;
            nombreServicio = "Luz";
            break;
        case 3:
            resultado -= internet;
            nombreServicio = "Internet";
            break;
        case 4:
            resultado -= telefono;
            nombreServicio = "Teléfono";
            break;
        default:
            esUnServicioValido = false;
    }

    if (!esUnServicioValido)
    {
        alert('¡El servicio ingresado no existe!');
    }
    else if (resultado < 0)
    {
        alert('¡No posee suficiente saldo en su cuenta para pagar este servicio!');
    }
    else 
    {
        saldoCuenta = resultado;

        actualizarSaldoEnPantalla();

        alert('Has pagado del servicio ' + nombreServicio + '\n' +
            'Saldo anterior: $' + saldoAnterior + '\n' +
            'Dinero descontado: $' + (saldoAnterior - resultado) + '\n' +
            'Saldo actual: $' + saldoCuenta);
    }
}

function transferirDinero() {
    var input = prompt('Ingrese el monto que desea transferir');

    if (!verificarInputDelUsuario(input)) return;

    var montoATransferir = parseInt(input);

    if (montoATransferir > saldoCuenta)
    {
        alert('¡El monto que desea transferir supera al monto disponible!');
    }
    else 
    {
        var input = prompt('Ingrese el número de la cuenta a la cual desea realizar la transferencia');

        if (!verificarInputDelUsuario(input)) return;

        var numeroCuentaATransferir = parseInt(input);

        var cuentaDestino = null;

        for (var i = 0; i < cuentasAmigas.length; i++)
        {
            if (cuentasAmigas[i] === numeroCuentaATransferir)
            {
                saldoCuenta -= montoATransferir;                

                cuentaDestino = cuentasAmigas[i];

                actualizarSaldoEnPantalla();

                break;
            }
        }

        if (cuentaDestino === null)
        {
            alert('¡La cuenta ingresa no existe!');
        }
        else
        {
            alert('Se han transferido $' + montoATransferir + '\n' +
                'Cuenta destino: ' + cuentaDestino);
        }
    }
}

function iniciarSesion() {
    var codigoSeguridadIngresado = parseInt(prompt('Ingrese el código de seguridad de su cuenta'));

    if (codigoSeguridadIngresado === codigoSeguridad)
    {
        alert('Bienvenido/a ' + nombreUsuario + ' ya puedes comenzar a realizar operaciones');
    }
    else 
    {
        saldoCuenta = 0;
        alert('Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad');
    }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}

iniciarSesion();