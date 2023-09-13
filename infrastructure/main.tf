provider "aws" {
  region = "eu-north-1"
}

terraform {
  backend "s3" {
    bucket  = "cinema-roman-terraform-state"
    key     = "cinema-app.tfstate"
    region  = "eu-north-1"
    encrypt = true
  }
}

locals {
  prefix = "${var.prefix}-${terraform.workspace}"
  common_tags = {
    Environment = terraform.workspace
    Project     = var.project
    ManageBy    = "Terraforrm"
    Owner       = "Roman Nemeth"
  }
}
