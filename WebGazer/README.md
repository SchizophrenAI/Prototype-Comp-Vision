### How to run the Webserver

Within the /www directory there are two HTML files:

  * `calibration.html`: This example includes additional user feedback, such as a 9-point calibration sequence, accuracy measurements and an informative help module.
  * `antisaccade.html`: This example contains a game where the user can move an orange ball with their eyes, which in turn collides with blue balls.

To run the example files as a server:

	# Clone the repository and download NodeJS using the steps listed above
	# First run
	cd WebGazer
	# install the dependencies
	npm install
	# build the project
	npm run build
	
	# Then Move into the www directory and download the additional dependencies
	cd www
	npm install
	# Run the webpage index.html as a server
	npm run serve

**Finally download webgazer.js from https://webgazer.cs.brown.edu/webgazer.js and place in www folder**

### Acknowledgements to Machine Learning Eye Tracking Software WebGazer

* [Official website](https://webgazer.cs.brown.edu)
* [API Docs](https://github.com/brownhci/WebGazer/wiki/Top-Level-API)

Webgazer is developed based on the research that is done by Brown University, with recent work at Pomona College. The work of the calibration example file was developed in the context of a course project with the aim to improve the feedback of WebGazer. It was proposed by Dr. Gerald Weber and his team Dr. Clemens Zeidler and Kai-Cheung Leung.

This research is supported by NSF grants IIS-1464061, IIS-1552663, and the Brown University Salomon Award.

## License

Copyright (C) 2021 [Brown HCI Group](http://hci.cs.brown.edu)

Licensed under GPLv3. Companies have the option to license WebGazer.js under LGPLv3 while their valuation is under $1,000,000.
