@echo off
set "JAVA_HOME=C:\Users\korub\AppData\Local\Programs\Eclipse Adoptium\jdk-21.0.10.7-hotspot"
set "PATH=%JAVA_HOME%\bin;C:\Windows\System32;C:\Windows\System32\WindowsPowerShell\v1.0;%PATH%"
cd /d "%~dp0backend"
echo Starting CareerPilotAI Spring Boot Backend on http://localhost:8080 ...
call mvnw.cmd spring-boot:run

