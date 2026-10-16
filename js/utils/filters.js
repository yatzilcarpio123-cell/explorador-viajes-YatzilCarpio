//FILTROS Y ORDENAMIENTO 
// BUSCAR PAISES POR NOMBRE 

export function buscarPaises(paises, texto){
    //normalizar nuestro texto 
    const  textoNormalizado = texto.trim().toLowerCase();

    //validación si no hay busqueda 
    if(!textoNormalizado){
        return paises;
    }

    /*FILTRAR POR NOMBBRE*/
    return paises.filter((pais) =>{
        //normalización del nombre de mi país
        const nombre = pais.names?.common?.toLowerCase() ?? "";
        return nombre.includes(textoNormalizado);
    });
}

//filtrar por continentes
export function filtrarPorContinentes(paises, continente){
    
    //filtrado all
    if(continente === "all"){
        return paises;
    }

    //filtrado por region 
    return paises.filter((pais) => pais.region === continente);
}

//ordenar paises
export function ordenarPaises(paises, criterio){
    //utilizar el spread operator 
    const paisesOrdenados = [...paises];

    //ordenar a-z con localcompare 
    if(criterio === 'az'){
        return paisesOrdenados.sort((a, b) => {
            const nombreA = a.names?.common ?? "";
            const nombreB = b.names?.common ?? "";

            return nombreA.localeCompare(nombreB);
        })
    }

    //ordenar z-a
    if(criterio === 'za'){
        return paisesOrdenados.sort((a, b) => {
            const nombreA = a.names?.common ?? "";
            const nombreB = b.names?.common ?? "";

            return nombreB.localeCompare(nombreA);
        })
    }
    return paisesOrdenados;
}

//función combinando procesamiento
export function procesarPaises(paises, texto, continente, criterioOrden){
    let resultado = buscarPaises(paises, texto);
    resultado = filtrarPorContinentes(resultado, continente);
    resultado = ordenarPaises(resultado, criterioOrden);

    return resultado;

}