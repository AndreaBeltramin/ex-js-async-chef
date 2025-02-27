// In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id).
// Questa funzione accetta un id di una ricetta e deve:
// - Recuperare la ricetta da https://dummyjson.com/recipes/{id}
// - Estrarre la proprietà userId dalla ricetta
// - Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
// - Restituire la data di nascita dello chef

// Note del docente
// Scrivi la funzione getChefBirthday(id), che deve:
// - Essere asincrona (async).
// - Utilizzare await per chiamare le API.
// - Restituire una Promise con la data di nascita dello chef.
// - Gestire gli errori con try/catch

// Esempio di utilizzo
// getChefBirthday(1)
//   .then(birthday => console.log("Data di nascita dello chef:", birthday))
//   .catch(error => console.error("Errore:", error.message));

async function getBirthdayChef(id) {
	let ricetta;
	try {
		const responseRicetta = await fetch(`https://dummyjson.com/recipes/${id}`);
		ricetta = await responseRicetta.json();
	} catch (error) {
		console.error(error);
		throw new Error("Non è possibile trovare la ricetta desiderata");
	}
	if (ricetta.message) {
		throw new Error(ricetta.message);
	}

	let birthdayDate;
	try {
		const userId = ricetta.userId;
		const responseInfoChef = await fetch(
			`https://dummyjson.com/users/${userId}`
		);
		const infoChef = await responseInfoChef.json();
		birthdayDate = infoChef.birthDate;
	} catch (error) {
		console.error(error);
		throw new Error("Non è possibile trovare la data di nascita dello chef");
	}
	if (!birthdayDate) {
		throw new Error("Data di nascita dello chef non trovata");
	}

	return birthdayDate;
}

async function funzioneDiSupporto() {
	try {
		const birthdayDate = await getBirthdayChef(1);
		console.log(`La data di nascita dello chef è ${birthdayDate}`);
	} catch (error) {
		console.error(error);
	} finally {
		console.log("fine del codice!");
	}
}

funzioneDiSupporto();

// Bonus 1
// Attualmente, se la prima richiesta non trova una ricetta, la seconda richiesta potrebbe
// comunque essere eseguita causando errori a cascata.
// Modifica getChefBirthday(id) per intercettare eventuali errori prima di fare la seconda richiesta.

// Bonus 2
// Utilizza la libreria dayjs per formattare la data di nascita nel formato giorno/mese/anno.
// Esempio di output atteso con formattazione
// Data di nascita dello chef: 15/06/1990
