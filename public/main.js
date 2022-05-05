// Focus div based on nav button click

// Flip one coin and show coin image to match result when button clicked

// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series

// Guess a flip by clicking either heads or tails button

const coin = document.getElementById("singlenav")
// Add event listener for coin button
			coin.addEventListener("click", flipCoin)
			function flipCoin() {
                fetch('http://localhost:5000/app/flip/', {mode: 'cors'})
  				.then(function(response) {
    			    return response.json();
  				})
				.then(function(result) {
					console.log(result);
					document.getElementById("single").innerHTML = result.flip + '<br><img src="./assets/img/' + result.flip + '.png" class="smallcoin">';
					document.getElementById("single").setAttribute("class", "active");
                    document.getElementById("home").setAttribute("class", "hidden");
                    document.getElementById("multi").setAttribute("class", "hidden");
                    document.getElementById("guess").setAttribute("class", "hidden");
				})
//				let flip = "FLIPPED"
//				document.getElementById("coin").innerHTML = flip;
//				console.log("Coin has been flipped. Result: "+ flip)
			}

const home = document.getElementById("homenav")
            home.addEventListener("click", displayInstructions)
            function displayInstructions() {
                // Reveal home instructions, hide all other attributes
                document.getElementById("home").setAttribute("class", "active");
                document.getElementById("single").setAttribute("class", "hidden");
                document.getElementById("multi").setAttribute("class", "hidden");
                document.getElementById("guess").setAttribute("class", "hidden");
            }

const multi = document.getElementById("multinav")
            multi.addEventListener("click", multiMenu)
            function multiMenu() {
                // First, clear previous results in multi
                document.getElementById("results").innerHTML = "";
                document.getElementById("heads").innerHTML = "";
                document.getElementById("tails").innerHTML = "";
                // Then, reveal multi, hide all other attributes
                document.getElementById("home").setAttribute("class", "hidden");
                document.getElementById("single").setAttribute("class", "hidden");
                document.getElementById("multi").setAttribute("class", "active");
                document.getElementById("guess").setAttribute("class", "hidden");
            }

const coins = document.getElementById("coins")
			// Add event listener for coins form
			coins.addEventListener("submit", flipCoins)
			// Create the submit handler
			async function flipCoins(event) {
				event.preventDefault();
				
				const endpoint = "app/flip/coins/"
				const url = document.baseURI+endpoint

				const formEvent = event.currentTarget

				try {
					const formData = new FormData(formEvent);
					const flips = await sendFlips({ url, formData });

					console.log(flips);
					document.getElementById("heads").innerHTML = "Heads: "+flips.summary.heads;
					document.getElementById("tails").innerHTML = "Tails: "+flips.summary.tails;
				} catch (error) {
					console.log(error);
				}
			}
			// Create a data sender
			async function sendFlips({ url, formData }) {
				const plainFormData = Object.fromEntries(formData.entries());
				const formDataJson = JSON.stringify(plainFormData);
				console.log(formDataJson);

				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json"
					},
					body: formDataJson
				};

				const response = await fetch(url, options);
				return response.json()
			}

const guessNav = document.getElementById("guessnav")
            guessNav.addEventListener("click", guessMenu)
            function guessMenu() {
                // First, clear previous values
                document.getElementById("guessOut").innerHTML = "";
                document.getElementById("flip").innerHTML = "";
                document.getElementById("correctness").innerHTML = "";
                // Reveal guess, hide all other attributes
                document.getElementById("home").setAttribute("class", "hidden");
                document.getElementById("single").setAttribute("class", "hidden");
                document.getElementById("multi").setAttribute("class", "hidden");
                document.getElementById("guess").setAttribute("class", "active");
            }

const guessHeads = document.getElementById("guessHeads")
            guessHeads.addEventListener("click", guessHeadsFunc)
            async function guessHeadsFunc(event) {
                // Make heads guess
                event.preventDefault();
				
				const endpoint = "app/flip/call/"
				const url = document.baseURI+endpoint

                let guess = {guess : "heads"}

				try {
					const flip = await sendGuess({ url, guess });

					console.log(flip);
					document.getElementById("guessOut").innerHTML = "Guess: " + flip.call;
					document.getElementById("flip").innerHTML = "Flip: " + flip.flip;
					document.getElementById("correctness").innerHTML = "Result: " + flip.result;
				} catch (error) {
					console.log(error);
				}
            }

            // Create a data sender
			async function sendGuess({ url, guess }) {
				const guessJson = JSON.stringify(guess);
				console.log(guessJson);

				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json"
					},
					body: guessJson
				};

				const response = await fetch(url, options);
				return response.json()
			}

const guessTails = document.getElementById("guessTails")
            guessTails.addEventListener("click", guessTailsFunc)
            async function guessTailsFunc(event) {
                // Make heads guess
                event.preventDefault();
				
				const endpoint = "app/flip/call/"
				const url = document.baseURI+endpoint

                let guess = {guess : "tails"}

				try {
					const flip = await sendGuess({ url, guess });

					console.log(flip);
                    document.getElementById("guessOut").innerHTML = "Guess: " + flip.call;
					document.getElementById("flip").innerHTML = "Flip: " + flip.flip;
					document.getElementById("correctness").innerHTML = "Result: " + flip.result;
				} catch (error) {
					console.log(error);
				}
            }

            // Create a data sender
			async function sendGuess({ url, guess }) {
				const guessJson = JSON.stringify(guess);
				console.log(guessJson);

				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json"
					},
					body: guessJson
				};

				const response = await fetch(url, options);
				return response.json()
			}