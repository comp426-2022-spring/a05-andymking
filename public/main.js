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
                document.getElementById("home").setAttribute("class", "active");
                document.getElementById("single").setAttribute("class", "hidden");
                document.getElementById("multi").setAttribute("class", "hidden");
                document.getElementById("guess").setAttribute("class", "hidden");
            }

const multi = document.getElementById("multinav")
            multi.addEventListener("click", multiMenu)
            function multiMenu() {
                document.getElementById("home").setAttribute("class", "hidden");
                document.getElementById("single").setAttribute("class", "hidden");
                document.getElementById("multi").setAttribute("class", "active");
                document.getElementById("guess").setAttribute("class", "hidden");
            }

const coins = document.getElementById("coins")
            // First, clear previous results
            document.getElementById("results").innerHTML = "";
            document.getElementById("heads").innerHTML = "";
            document.getElementById("tails").innerHTML = "";
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