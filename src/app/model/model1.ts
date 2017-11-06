import { JsonObject, JsonProperty } from 'json2typescript';


@JsonObject
export class Child {

   @JsonProperty('Property1', Number)
   public Property1: number = 0;

   @JsonProperty('Property2', String)
   public Property2: string = undefined;
}

@JsonObject
export class Parent {

   @JsonProperty('Property1', Number)
   public Property11: number = 0;

   @JsonProperty('Property2', String)
   public Property2: string = undefined;

   @JsonProperty('Property3', Child)
   public Property3: Child = undefined;
}


