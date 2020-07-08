import { Construct } from 'constructs';
import { App, Chart } from 'cdk8s';
import { Deployment, Service, IntOrString } from './imports/k8s';

export class MyChart extends Chart {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    // define resources here
    const label = { app: 'myweb-cdk8s' };
    new Service(this, 'service', {
        spec: {
          type: 'LoadBalancer',
          ports: [ { port: 80, targetPort: IntOrString.fromNumber(8080) } ],
          selector: label
        }
      });

      new Deployment(this, 'deployment', {
        spec: {
          replicas: 2,
          selector: {
            matchLabels: label
          },
          template: {
            metadata: { labels: label },
            spec: {
              containers: [
                {
                  name: 'myweb-cdk8s',
                  //change me
                  image: '1234567890.dkr.ecr.us-east-2.amazonaws.com/myweb:0.0.3',
                  ports: [ { containerPort: 8080 } ]
                }
              ]
            }
          }
        }
      });
  }
}

const app = new App();
new MyChart(app, 'myweb-cdk8s');
app.synth();
