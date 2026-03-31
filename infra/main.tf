provider "aws" {
  region = "us-east-1"
}

resource "tls_private_key" "project_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "project_key" {
  key_name   = "project.key"
  public_key = tls_private_key.project_key.public_key_openssh
}

resource "local_file" "private_key" {
  content  = tls_private_key.project_key.private_key_pem
  filename = "project.key.pem"
}

resource "aws_instance" "devops_server" {
  ami           = "ami-0c3389a4fa5bddaad"
  instance_type = "t2.micro"
  key_name      = aws_key_pair.project_key.key_name

  tags = {
    Name = "devops-server"
  }
}