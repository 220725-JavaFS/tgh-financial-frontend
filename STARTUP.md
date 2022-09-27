# Setting up Docker Containerization on EC2 Instance for Angular Front End
## Table of contents
* [AWS (EC2)](#aws-ec2)
* [Jenkins](#jenkins)

## AWS (EC2)
* Install Node
	- curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
	- . ~/.nvm/nvm.sh
    - nvm install --lts

* Install Docker
    - sudo yum install docker
		
* Start services and add tomcat to docker usergroup
	- sudo systemctl start tomcat
	- sudo systemctl start docker
	- sudo usermod -aG docker tomcat
		
	- For EC2's with limited resources use swap space
		- https://aws.amazon.com/premiumsupport/knowledge-center/ec2-memory-swap-file/
			- Our instance
				- sudo dd if=/dev/zero of=/swapfile bs=128M count=8
				- sudo chmod 600 /swapfile
				- sudo mkswap /swapfile
				- sudo swapon /swapfile
				- sudo swapon -s
				- sudo vi /etc/fstab
				- vim -> /swapfile swap swap defaults 0 0
					
## Jenkins
* Jenkins (Instance public IPv4 Address):8080/jenkins)
	- Create FreeStyle Project
	- Link GitHub Project URL: (https://github.com/project)
	- Branches to Build (*/main)
	- Build Triggers (GitHub hook trigger for GITScm polling)
	- Source Code Management
	- Repository URL: (https://github.com/project.git)

* Build
	- Build Environment
        - Provide Node & npm bin/ folder to PATH
		    - Use system default npmrc file
		    - Use default cache location
			
	- Add Build step
		- Execute Shell
            - npm install
            - ng build --build-optimizer=false --configuration=production
            - docker stop tgh-financial
            - docker rm tgh-financial
		    - docker build -t apache .
		    - docker run -dit -p 80:80 --name tgh-financial apache