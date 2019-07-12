variable "project" {
  default = ""
}

provider "google" {
  credentials = "${file("keyfile.json")}"
  project     = "${var.project}"
}