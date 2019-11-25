window.addEventListener("load",initListener,false);
 function initListener()
 {
 	let mass = [{fullName : {surname : 'xxx', firstName : 'yyy', middleName: 'zzz'}}, 
 				{fullName : {surname : 'XXX', firstName : 'YYY',middleName: 'ZZZ'}},
 				{fullName : {surnames : 'xXx', firstName : 'yYy', middleName: 'ZzZ'}}],
		localization = {'fullName.surname' : 'Прізвище', 'fullName.middleName' : 'По-батькові'},
		transformRules = {fullName : {surname : true, firstName : true, surnames : true, middleName: false}};

	 console.log(transformMass(mass, localization, transformRules));
    
 }

function transformMass(mass, localization, transformRules){
	let pathMass = [],
		transformRulesMass = [],
		filterPatchMass = [],
		resultMass = [],
		repeatingElements = [];
//Создание мачивов с путями к элементов базового массива и масива превращений
	for(let value of mass)
		pathMass.push(...mapObject(value)) ;
	transformRulesMass.push(...mapObject(transformRules)) ;
//Создание массива отфильтрованого по правилам массива превращений
	for(let item of pathMass){
		for(let element of transformRulesMass){
			if(item.name == element.name && element.value){
				filterPatchMass.push({name:item.name, value: item.value});
			}
		}
	}
//Создание конечного масива с локализацией названий идобавления свойст для одинаковых обьектов
	for(let value of filterPatchMass){
		let col = 0,
			resultObject = {};
			
			for(let item of filterPatchMass){
				let elementIndex = filterPatchMass.indexOf(item);
				if(repeatingElements.indexOf(elementIndex) === -1 ){
					if(value.name === item.name){
						localization.hasOwnProperty(value.name)?
							resultObject['name'] = localization[value.name]:
							resultObject['name'] = value.name.substr(value.name.indexOf('.')+1)
						resultObject['value'+ ++col] = item.value;
						repeatingElements.push(elementIndex);
					}
				}
			}
		if(Object.keys(resultObject).length !== 0)
			resultMass.push(resultObject);
	}
	return resultMass;
}
//Создание массива путей к свойствам обьекта
function mapObject(obj){
	let paths=[];

	function scan(obj,stack){
	   let item, path;

	   for(item in obj){
	       if(obj.hasOwnProperty(item)){
	           path=stack.concat([item]);
	           if((obj[item])!==null && typeof (obj[item])=='object'){
	               scan((obj[item]),path);
	           }else{
	               paths.push({name:path.join('.'), value: obj[item]});
	           }
	       }
	   }
	}
	scan(obj,[]);
	return paths;
}
