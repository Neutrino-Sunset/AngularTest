== Tasks


-- This Sprint


Client workspaceHeight looks nasty.

Fix ScheduleController.DeleteCallerSchedule. PENDING.
	When deleting schedule move code that clears caller metrics to DAL in a way that maintains db integrity.

Optimise schedule callpoints 'Fully Scheduled' column no longer updates.

auth.service implementation is apalling. Zero encapsulation.

General UI/Code issues.
   Implement Splitter resizing using Flexbox.
   Discuss Bootstrap wrapping. (Dashboard).
   Overuse of cut/copy/paste.

Research Ngrx

Investigated what looks like an authentication error, put in a temporary workaround and opened a new bug ticket PSN-989. DONE.

Refactored the TestDataHelper in the DAL to remove 500 lines of cut copy and pasted code. DONE.

Fix schedule generation ignoring Caller active day configuration. DONE.

Fixed the new project implementation so that its database manipulation occurs atomically in the DAL. DONE.

PSN-792 General UX

Indicate dev or production server mode in status.

Discuss data integrity strategies.
	Tempted to make direct access mutable operations internal only. DONE.
	






==== Code Reviews ====


== Wizard breadcrumb and navigation PSN-969


-- WizardComponent

import { StepComponent } from './step.component';

I'd prefer it if all paths start from the root. That way you can see where something is without having to double check where the current object is and derive the relative path from there. It also looks neater in the list of imports. A blank line betweeen system/third-party imports and the applications own imports is also a nice touch.

Shouldn't the StepComponent be in a subdirectrory of the WizardComponent? One component per directory seems like a sound strategy.

In the "Example usage:" comment, might as well group property bindings and event handlers together.

No TypeScript type on 'change', 'cancel' or 'finish' events.

Comment for the 'change' event states 'can be used by the client to trigger on change event'. What it actually does is notify the client that the wizard page has changed. Similar misleading comment on 'finish' and 'cancel'.

In ngAfterContentInit
   'this.steps.toArray().forEach' what is the toArray for? QueryList is directly enumerable and works fine without it.

   'this.activeIndexChange.emit(index);' in the command handler used to initialise the p-steps. activeIndexChanged exists to notify p-steps when the selected wizard page is changed, but this handler is called when it was p-steps that changed the page in the first place. p-steps doesn't need to be notifified that the page has changed when it was p-steps that made the change in the first place. In which case this line is redundant.

   'this.change.next(step.label);' in the command handler used to initialise the p-steps.


-- WizardService

Use leading underscore for private class member variables.


-- WizardTestComponent

Where you use a raw style in html I see this
   style="width: 59%;display: inline-block;margin-right: 5px;"

Having the space after the colon makes it look as if the 59% is associated with the display instead of the width. It's hard on the eye. If you want to space out css properties in a style I suggest you put the space after the semicolon instead e.g.
   style="width:59%; display:inline-block; margin-right:5px;"

This is much easier to read.

'change', 'finish', 'cancel' event declarations missing TypeScript type specifiers.

In the html the buttons are listed in order 'finish', 'next', 'previous', 'cancel'. But they display in the opposite direction. That's rather confusing, a comment explaining why that is would be useful.


-- StepEvent


-- BrowserWindowService

const createWindowSize$ = () => ...

Here you are using a Javascript style function variable using a lambda. Since this is a Typescript file is there any reason why this can't be declared in a typesafe manner like a normal Typescript function? e.g.

function createWindowSize(): Observable<whatever> {
   ...
}

Same with getWindowSize


-- Wizard Title

The wizard title is being supplied by the client with the wizard then being used underneath e.g. from wizard-test.component

   <div class="cs-wizard-title"><h3>Create new project - {{stepLabel}}</h3></div>
   <div>
      <callsmart-wizard [(activeIndex)]="activeIndex" 
         ...

This approach strikes me as problematic.

There is no obvious reason why the client would want to have to handle the wizard title manually for every wizard. Doing it manually means having to position and style the title correctly, subscribe to the wizard service to get the step label, declare a backing variable to hold the step label, and inject the step label into the title using string interpolation. There's no obvious reason why the client would want to have to do that whenever they want to use a wizard.

The alternative would be for the wizard to expose a 'title' property which it uses in its own html template. The client provides the title and the wizard adds the step label. That seems a lot more encapsulated, makes reuse of the wizard simpler for the client, and there's no obvious reason why the title shouldn't be considered as part of the wizard anyway.

Which leads me neatly onto, the WizardService. I can't actually see any reason for this service to exist at all. Currently it is being used to enable the client to get the step label which it then uses to construct the wizard title. But it was the client that declared the step labels in the first place when it created the wizard, so the client already knows the labels. The client also knows the wizard's activeIndex which tells it which step is active. So for the client to get the label for the active step is trivial and there is no obvious reason why this requires an application wide service to achieve.

Of course, if the wizard handles the title itself as described above then the wizard can also retrieve the step label from the StepComponent, so that approach doesn't need a WizardService either.

When creating a component like a wizard the intent is twofold.
   1. Make it possible to reuse the logic elsewhere.
   2. Encapsulate the complexity behind an interface that is as simle for the client to use as possible.
The WizardService works against both of these objectives.

When designing a class think about how the client wants to use it. A class interface should seek strive to achieve the following objectives.
   1. Make the common tasks trivial.
      Initialisation and common usage should be as simple as possible.
   2. Make more complicated operations possible.
      More advanced task that the client might want to do should be supported, but might require a bit more work from the client.
   3. The interface should make it obvious how the class is intended to be used.
      This can often be achieved by ensuring that there is only one way to perform each task.
   4. Ideally interface should make it impossible to use the class incorrectly.
      Checking initialisation arguments etc.

If a client wants to know when the wizard page changes it seems they can either attach a handler to activeIndexChange and check the activeIndex, or they can attach a hander to the change event (which also passed the step label), or they can subscribe to the WizardService.stepLabel& observable. At first glance that seems like 3 different ways to achieve the same thing.








== Scheduling Architecture

PSN-344 I want to run the optimiser (Scheduler module) asynchronously.

   --Requirements
   CallSmart App Server needs to expose a Scheduling api to the client.
   Scheduling api must be asynchronous.
   App Server must be able to process requests from multiple clients concurrently.

   --Analysis
   Scheduler module is inherently synchronous.
   Something needs to control the spawning of several concurrently running Scheduler module processes.
   The App Server should not be the thing controlling Scheduler module processes.
   An addional service of some type should be created to accept scheduler requests and control the spawning of the Scheduler module to process those requests.
   Dotnet Core does not have WCF server support. (It may be added later).
   Dotnet Core does not directly support Windows services.
   Creating another ASP Dotnet Core web service has these pros and cons
      pros:
      Can be Azure hosted.
      cons:
      None of WCF's support for SOAP.
      Have to install and configure an additional web service.
      
   --Tasks
   Create new ASP Dotnet Core web server called Scheduler that will process scheduling requests.
   Design and implement an API on the Scheduler server that enables a client to request a schedule.
   Design and implement an API on the Scheduler server that enables a client to receive progress notifications for a schedule being generated.
   The App Server will need to expose an API that enables a client to determine what schedules are processing.
      This might not be possible until we have a Schedule Project as there is no entity in the database against which to relate that state information.
   Design and implement an API on the Scheduler server that enables a client to retrieve a completed Schedule.
   
   The App Server will need to expose its own API to the CallSmart client. It will need to coordinate requests to the Scheduler server and store state information and generated schedules in the database.
      App Server log will include retrieve drivetimes from the database and passing them to the Scheduler server.
   
   The Scheduler server needs to be able to spawn a configurable number of concurrent Scheduler module instances.
   
   It will be passed the drivetimes to use by the App Server
   .
   When the number of outstanding schedule requests exceeds the number of Scheduler processes the schedule requests must held in a queue until they can be processed.
   
   Its api should be asynchronous.
      
   Drivetimes should be stored in the database and retrieved by the App Server then passed to the Scheduler server.
   


== Process and Tooling

Agile.
   Current process. Scrum + conventional Agile?
   Alternatives?

Debugging using VSCode.
   Debugger for Chrome
   Intellisense for CSS class names.


== Architecture
   
Fix Visits or do it differently using persisted data and change notification?

Use of JSON vs XML.

Multiple users accessing the same schedule project simultaneously.
   Subsequent openings read only?

Bootstrap
   Use of xs and sm size specifiers seems redundant.

Controller return values.
   IActionResult vs ?

Error handling.

Logging.
   Would be useful to be able to view the json returned by the App Server, but currently we can't because of the authentication.

Routing
   Hash routing vs path location strategy.
      
      
      
== Dotnet Core Versoning

The Dotnet Core toolset is comprised of 3 components.

CLI. The dotnet.exe executable (any maybe some other bits and pieces).

Runtime.

SDK.

By default the cli (dotnet.exe) used the latest version of the SDK. This can be overridden using global.json in the same directory as the csproj file, or a higher level directory shared by multiple projects.



The latest production ready Dotnet Core toolset is .Net Core SDK 1.0.4. This supports two runtimes 1.0.5 (LTS) and 1.1.2


   


