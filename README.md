# logger

![GitHub package.json version](https://img.shields.io/github/package-json/v/LucasNatoli/logger?logo=typescript&logoColor=%233178C6) ![GitHub last commit](https://img.shields.io/github/last-commit/LucasNatoli/logger)  ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/LucasNatoli/logger)
![GitHub License](https://img.shields.io/github/license/LucasNatoli/logger)
---

Basic utility class to log processes messages to info, warning and error files.

Use this class to write event and process messages according to their severity level:

+ **info**: Information. Start/End of processes, etc.
+ **warn**: Warnings. Unexpected conditions, programmed alert thresholds, etc.
+ **error**: Errors. Failure conditions that prevent a process from being carried out. Filesystem, Network, etc.

The utility automatically logs timestamped lines for each message using the template: 

````ts
`${timestamp} [${process}] ${message}\n
````

## Installation

````bash
npm install @lucas-natoli/logger
````

## Usage

Create an instance of Logger indicating a base filename.

Use `info()`, `warn()` and `error()` methods to write log info.

Log folder can be set using environment variable `LOG_FOLDER`. If not specified, the utility will create a folder named `logs` inside the app folder.

Typescript:

````ts
//main.ts
import Logger from "@lucas-natoli/logger";

/* 
This will write to three different files:
'test_info.log', 'test_warn.log' and 'test_error.log' to the log folder.
*/
const logger: Logger = new Logger("test");
logger.info("token-rotation", "Token successfully rotated.");
logger.warn("login", "Client sent malformed data.");
logger.error("app-start", "Can't connect to DB.");
````

Sample usage with LOG_FOLDER env var. 

````bash
LOG_FOLDER="/users/dev/logs" node main.js
````

### Sample output

The above example will output the following files:

#### test_info.log:
````
1777913130976 [token-rotation] Token successfully rotated.
````
#### test_info.log:
````
1777913130977 [login] Client sent malformed data.
````
#### test_info.log:
````
1777913130978 [app-start] Can't connect to DB.
````

