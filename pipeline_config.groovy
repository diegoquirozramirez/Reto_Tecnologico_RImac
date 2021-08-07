pipeline_template = "template_default"

agent any

libraries{
    npm {
        image_tag = "node:10.16.3-alpine"
        dockerfile = "${PWD}/Dockerfile"
        docker_compose = "${PWD}/docker-compose.yaml"
        example = "${PWD}/example.sh"
        dir = "${PWD}"
    }
    sonarqube
    ansible
}

application_environments{
    dev{
        long_name = "Development"
        ip_addresses = [ "0.0.0.1", "0.0.0.2" ]
    }
    prod{
        long_name = "Production"
        ip_addresses = [ "0.0.1.1", "0.0.1.2", "0.0.1.3", "0.0.1.4" ]
    }
}