 Тестовое задание
------
## 1. Build

> it's important to use maven build, because frontend part builds via node which is executed by plugin in maven

```shell
./mvnw clean install    # for mac/linux
mvnw.cmd clean install  # for windows
```

## 2. Execution
```shell
java -jar target/demo-0.0.1-SNAPSHOT.jar
```