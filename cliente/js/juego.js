var Juego = function(){
	
	this.socket = null;

	this.init = function(){
		try{
			this.socket = io();
			var key = document.getElementById("key");
			
			key.juego = this;
			key.onkeydown = this.keyDown;

			this.socket.on("agregarClientes", this.agregarClientes).juego = this;
			this.socket.on("removerClientes", this.removerClientes).juego = this;
			this.socket.on("notificarClientes",	this.notificarClientes).juego = this;

			window.socket = this.socket;
			window.onbeforeunload = function(){
				window.socket.emit("desconectarCliente","");
				window.socket = null;
			}

			return true;
		}catch(err){
			window.alert(err.message);
			return false;
		}
	};

	this.keyDown= function (e){
		try{
			e = e || window.event;

			var keyCode = e.which || e.keyCode;
			var oInp = e.currentTarget || event.srcElement;
			oInp.value = oInp.value.substring(oInp.value.length+1);

			this.juego.socket.emit("keyDown", keyCode);
			
			return true;
		}catch(err){
			window.alert(err.message);
			return false;
		}
	};

	this.agregarClientes= function(clientesIDs){
		try{
			var contClientes = document.getElementById("contClientes");
			clientesIDs = JSON.parse(clientesIDs);
			for(var i in clientesIDs){
				var textarea = document.createElement("textarea");
				textarea.id = "cliente_" + clientesIDs[i];
				
				contClientes.appendChild(textarea);
			}

			return true;

		}catch(err){
			window.alert("Error en la función agregarClientes: " + err.message, "error");
			return false;
		}
	};

	this.removerClientes= function(clientesIDs){
		try{
			var contClientes = document.getElementById("contClientes");
			clientesIDs = JSON.parse(clientesIDs);
			for(var i in clientesIDs){
				var textarea = document.getElementById("cliente_" + clientesIDs[i]);
			
				if(textarea){
					contClientes.removeChild(textarea);
				}
			}

			return true;

		}catch(err){
			window.alert("Error en la función removerClientes: " + err.message, "error");
			return false;
		}
	};

	this.notificarClientes = function(obj){
		try{
			obj = JSON.parse(obj);
			var oInp = document.getElementById("cliente_" + obj.socketId);
			oInp.value = oInp.value + "\n" + obj.accion;

		}catch(err){
			window.alert("Error en la función notificarClientes: " + err.message, "error");
			return false;
		}
	};
}
var juego = new Juego();