# Pet Store API exercise

## Prerequisites

1. Gradle installed and configured
2. Java version < 20
3. The API must be installed locally
4. K6 installed and configured locally

## Local Configuration

Clone the project

```bash
  git clone https://github.com/gelberospina/project_sps
```

Go to project project directory

```bash
  cd (folder_where_you_cloned_the_project)/petstore-k6-test/src/test/
```

Validate K6

```bash
  cd k6 --version
```

## Execution

To run the functional test cases

```bash
  k6 run /java/functional/main.js
```

To run the performance test

```bash
  k6 run /java/performance/script.js
```

> **FUNTIONAL_NOTE**:
>
> - Module Importation:
>   Imports various functions from different test files (login_test.js, creation_test.js, search_test.js, update_test.js,delete_test.js), which contain the implementations of test actions like loginUser, creationUser, searchUser, updateUser, and deleteUser.

> - Data Reading:
>   Configuration and payload data are read from a JSON file (data.json) and assigned to various constants to be used in the tests.

> - Setting Up Parameters and Payloads:
>   Payloads and parameters are defined for different test cases. These payloads and parameters are specific to each user.

> - Defining and Running Test Cases:
>   Four test cases are defined. Each test case performs different combinations of actions.

> **PERFORMANCE_NOTE**:
>
> - Module Importation
>   http: Module for making HTTP requests.
>   check: Function to validate the responses of the requests.
>   sleep: Function to add pauses between requests.
>   Trend: Class to record custom metrics.

> - Data Configuration
>   Loads configuration data from a JSON file (data.json).
>   Assigns the base URL, payload, and parameters to constants for use in the test.

> - Scenario Definition
>   ramping (Progressive load scenario): increasing VUs from 0 to 100 in 1 minute and then decreasing them to 0 in 45 seconds.
>   spike (Spike load scenario): with rapid increases and decreases in VUs.
>   load (Constant load scenario): running 3000 iterations per second for 60 seconds.
>   stress (Stress scenario): increasing VUs to 1000 in 1 minute, maintaining them for 2 minutes, and then decreasing them in 1 minute.

> - Test Execution
>   Builds the login URL by concatenating /login to the base URL.
>   Send an HTTP GET request to the login URL with payload and parameters configured before.
>   Check is to validate that the response status is 200.

## Documentacion

[K6](https://k6.io/docs/)
