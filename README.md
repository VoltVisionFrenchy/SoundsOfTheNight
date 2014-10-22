Repository Name: Sounds of the Night!

Project Purpose:
This repository is the software server engine (currently written in Node.js) which allows a Beaglebone Black to read an analog signal representing a light sensor to determine if someone is shining a flashlight at the animal.  If a flashlight is detected, then the BBB outputs a logic high to turn on a Mosfet/LED circuit (causing the animal to light up) and also to play an audio WAV file of an animal sound.

[This video](https://www.youtube.com/watch?v=EDCYTjFhtKg&list=UUbAsVdwkd1Kj010x0iF0gYQ) explains the concept very quickly.

The webpage for the original event is [here](http://www.voltvision.com/projects/winter-night-lights-at-audubon/).


The blog series which explains the animal construction and design is here:
http://www.voltvision.com/beaglebone-black-and-sounds-of-the-night-installment-1-of-7/

Independent from this software repository, a few other things had to happen on the BBB:
1) The audio WAV file for each of the 5 animals was manually loaded onto each animal at the time of programming.
2) The Node server that this repository represents had to be manually configured as a service to auto-start @ each reboot.

Notes for desired Improvements as we transition from 2013 -> 2014:
1) The OS at the time of the original 2013 animals was Angstrom, though as we re-tool for 2014 we will be switching to Debian
2) The first revision of software only played one WAV file, but for 2014 we would like to cycle through all sounds in a certain folder.
3) It would be awesome to have a Config webpage where we could see the real-time light sensor values (maybe also min/max/ave) and set the light sensor trigger thresholds.  Maybe later other options like fade-in/fade-out times for the LEDs, etc, etc.
4) Optionally, it would be cool if I could get real-time feedback if any animal malfunctions or loses power.
5) Post-2014 it would be cool to allow people to control groups of animals via their smart devices.



2014-10-22 NOTE:
This repository was originally called "Audubon2013-Wow4-SoundsoftheNight" to reflect the event that it was originally designed for back in Nov/Dec2013.  As the project develops, however, it is clear that the name should be more general purpose so that the code can be used with and for many different events and applications.  As of today we are changing the repository name to "SoundsOfTheNight" to better reflect the project's true purpose.
