# ReactNativeTemplate

This is a sample template for React-native consuming some services made with spring-boot

### How do I get set up?

* **Clone The project**:

	git clone https://github.com/kasra21/reactNativeTemplate.git

* **Details**:

In the `/dbScript` there are any mysql database script to run on a new or out of date database (unfinished)

In the `/SpringBootTemplate` there is the spring boot piece

In the `/ReactNativeTemplate` There is the react-native code

* **Build/Deploy**:

For the spring boot go to `/SpringBootTemplate` and execute:

	 mvn clean package

This will generate your binary file which you may run:

	java -jar target/spring-boot-demo-1.0.jar

Try to avoid directly running it with `mvn spring-boot:run` which may cause problems for shutting down the service.
Then assuming that the database is already set up you may access the app from:

	http://localhost:8080/

Or by making rest requests or by using postman or equivalent software

The `/ReactNativeTemplate` has 2 equivalent directories, `/ReactProject` is built with a `react-native init` initializer, `/ReactProjectDirectDeploy` is built with a `create-react-native-app` initializer.
In `/ReactNativeTemplate` you can follow the instructions and use expo to really quickly see the result of the app (assuming your database is setup)

Also keep in mind that `SpringBootTemplate` needs to be running with the appropriate database setup.
