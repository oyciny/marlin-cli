# Marlin CLI
Quickly configure and build a custom version of Marlin Firmware for use on your 3D printer or any other device that runs Marlin.

## Requirements
You will need a Python interpreter (preferrably version 3 but 2.7 will work as well). Follow this link to get python installed if you don't already have it.  
Latest Version of Python (https://www.python.org/downloads/)  

You will also need Node.js which can be downloaded here:  
Node.js Latest Version (https://nodejs.org/)

## Getting Started
To start using the marlin-cli you first must install it. To do this run the following command in your terminal:  

```shell
> npm i -g marlin-cli
```

This will install the marlin-cli globally so you can access it from any directory on your machine. If you ever need help figuing out how the cli works just run this command:  

```shell
> marlin help
```

Once marlin-cli has been installed you should probably update it. The package comes with a pre bundled version of Marlin and basic configurations for all the supported boards but it is always a good idea to update to the newest version when you can.  

```shell
> marlin update
```

After that we are ready to configure our own custom version of Marlin. To do this all you have to do is run this command and follow the on-screen instructions:  

```shell
> marlin configure
```

Once you have completed that you now have a custom configuration for Marlin. Now we have to build it so it is ready to be used on the printer. We do that with the following command:  

```shell
> marlin build
```

Now you should have a firmware.bin file on your desktop. Simply plug in your microSD card and put the firmware.bin file onto it. Now plug it into your printer and turn it on. Wait a few seconds and your custom firmware will be installed.