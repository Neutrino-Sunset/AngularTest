import { Component, OnInit } from '@angular/core';
import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';

import { Parent, Child } from 'app/model/model1';

@Component({
  selector: 'app-model-test',
  templateUrl: './model-test.component.html',
  styleUrls: ['./model-test.component.css']
})
export class ModelTestComponent {

   public OnClick(): void {
      this.test2();
   }

   private test2(): void {
      let json: Object = {
         'Property1': 42,
         'Property2': 'Bob',
         'Property3': {
            'Property1': 43,
            'Property2': 'Fred',
         }
      };

      let jc: JsonConvert = new JsonConvert();
      let parent: Parent;

      try {
         // This will error if there are properties on the json that are not on the model, and also if there are
         // properties on the model that are not present in the json.
         parent = jc.deserialize(json, Parent);
      }
      catch(e) {
         console.log('Error: ' + e);
      }

      console.log('Deserialised Parent');
      console.log(JSON.stringify(parent));
   }

   /*private test1(): void {
      let parent: Parent = new Parent();
      parent.Property1 = 42;
      parent.Property2 = 'Bob';

      let child: Child = new Child();
      child.Property1 = 43;
      child.Property2 = 'Fred';

      parent.Property3 = child;

      console.log('Original Parent');
      console.log(parent.toString());
      console.log('');

      let jstr: string = JSON.stringify(parent);
      let jobj: Object = JSON.parse(jstr);

      console.log('Parent as JSON string');
      console.log(jstr);
      console.log('');

      console.log('Parent as JSON object');
      console.log(jobj);
      console.log('');

      let jc: JsonConvert = new JsonConvert();
      let newParent: Parent;

      try {
         newParent = jc.deserialize(jobj, Parent);
      }
      catch(e) {
         console.log('Error: ' + e);
      }

      console.log('Deserialised Parent');
      console.log(JSON.stringify(newParent));
   }*/
}
