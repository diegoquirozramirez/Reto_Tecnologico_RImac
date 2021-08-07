pipeline_template = "template_default"

libraries{
    //npm {
    //    image_tag = "node:10.16.3-alpine"
    //}
    // si usa infra. cloud serverless
    /*serverless {
        enforce_deploy = true
    }*/
    sonarqube
    /*email {
        to = "example@admin.com"
    }*/
}

application_environments{
    dev{
        //si es en la nube aws
        aws {
            credentials_id = "*****"
            stage = "DESA"
        }
        // si es on-premise
        on_premise {
            ip_address = "XYZ.XYZ.XYZ.XYZ"
            port = "ZZZZ"
        }
    }
    /*test{
        //si es en la nube aws
        aws {
            credentials_id = "*****"
            stage = "TEST"
        }
        // si es on-premise
        on_premise {
            ip_address = "XYZ.XYZ.XYZ.XYZ"
            port = "ZZZZ"
        }
    }
    prod{
        //si es en la nube aws
        aws {
            credentials_id = "*****"
            stage = "PROD"
        }
        // si es on-premise
        on_premise {
            ip_address = "XYZ.XYZ.XYZ.XYZ"
            port = "ZZZZ"
        }
    }*/
}