import { TestBed, async, inject } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { HttpClientModule, HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from './../../environments/environment';


describe(`HttpClientFeatureService`, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        AuthenticationService
      ]
    });
  });

  // afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
  //   backend.verify();
  // }));

  // it(`should send an expected login request`, async(inject([AuthenticationService, HttpTestingController],
  //   (service: AuthenticationService, backend: HttpTestingController) => {
  //     const loginForm = { user_id: 'admin', password: 'admin123' };
  //     service.saveLogin(loginForm).subscribe();

  //     backend.expectOne((req: HttpRequest<any>) => {
  //       const body = new HttpParams({ fromString: req.body });

  //       return req.url === environment.auth_microservice + '/user/'
  //         && req.method === 'POST'
  //         //&& req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
  //         && body.get('user_id') === 'admin'
  //         && body.get('password') === 'admin123';
  //     }, `POST to 'auth/login' with form-encoded user and password`);
  //   })));

  it(`should issue a request`,
    async(
      inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
        const loginForm = { user_id: 'admin', password: 'admin123' };
        http.post(environment.auth_microservice + '/user/', loginForm).subscribe();

        const req = backend.expectOne(environment.auth_microservice + '/user/');
        expect(req.request.method).toBe('POST');
        req.flush({});
        backend.verify();
        // backend.expectOne({
        //   url: environment.auth_microservice + '/user/',
        //   method: 'POST'
        // }).flush(null);
      })
    )
  );

  it(`should not issue a PUT request`, async(inject([HttpClient, HttpTestingController],
    (http: HttpClient, backend: HttpTestingController) => {
      http.post('/allez', { value: 123 }).subscribe();
      http.get('/allez').subscribe();
      http.delete('/allez').subscribe();
      //   const req = backend.expectNone(environment.auth_microservice + '/user/');
      //  req.flush({});
      backend.expectNone((req: HttpRequest<any>) => {
        return req.method === 'PUT';
      });
    })));

  it(`should send an expected login request`, async(inject([AuthenticationService, HttpTestingController],
    (service: AuthenticationService, backend: HttpTestingController) => {
      const loginForm = { login_username: 'admin', login_password: 'admin123' };
      const dummyResponse = [{
         'role': 'maker' 
      }];
      service.saveLogin(loginForm).subscribe((next) => {
        console.log('testing ', next);
        expect(next).toBeTruthy();
       // expect(next.length).toBe(2);
        expect(next[0].role).toEqual('maker');
      });
      // backend.expectOne({
      //   url: environment.auth_microservice + '/user/',
      //   method: 'POST'
      // }).flush( { status: 200, statusText: 'Ok' });

      backend.expectOne({
        url: environment.auth_microservice + '/user/',
        method: 'POST'
      }).flush(dummyResponse);

      //backend.expectOne('auth/login').flush(null, { status: 200, statusText: 'Ok' });
      // backend.expectOne((req: HttpRequest<any>) => {
      //   const body = new HttpParams({ fromString: req.body });

      //   return req.url === environment.auth_microservice + '/user/' + loginForm
      //     && req.method === 'POST'
      //     && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
      //     && body.get('user_id') === 'admin'
      //     && body.get('password') === 'admin123';
      // }, `POST to login with form-encoded user and password`);
    })));


  // it(`should NOT fail when sending an un-matched request`, async(inject([HttpClient, HttpTestingController],
  //   (http: HttpClient, backend: HttpTestingController) => {
  //     const loginForm = { user_id: 'admin', password: 'admin123' };
  //     http.post(environment.auth_microservice + '/user/', loginForm).subscribe();

  //     backend.match('/abc');
  // })));

  // it(`should emit 'false' for 401 Unauthorized`, async(inject([AuthenticationService, HttpTestingController],
  //   (service: AuthenticationService, backend: HttpTestingController) => {
  //     const loginForm = { user_id: 'admin', password: 'admin123' };
  //     service.saveLogin(loginForm).subscribe((next) => {
  //       expect(next).toBeFalsy();
  //     });

  //     //backend.expectOne('auth/login').flush(null, { status: 401, statusText: 'Unauthorized' });
  //     backend.expectOne({
  //       url: environment.auth_microservice + '/user/',
  //       method: 'POST'
  //     }).flush(null, { status: 401, statusText: 'Unauthorized' });
  //   })));

  //   it(`should emit 'true' for 200 Ok`, async(inject([AuthenticationService, HttpTestingController],
  //     (service: AuthenticationService, backend: HttpTestingController) => {
  //       const loginForm = { user_id: 'admin', password: 'admin123' };
  //       service.saveLogin(loginForm).subscribe((next) => {
  //         expect(next).toBeTruthy();
  //       });

  //       // backend.expectOne('auth/login').flush(null, { status: 200, statusText: 'Ok' });
  //       backend.expectOne({
  //         url: environment.auth_microservice + '/user/',
  //         method: 'POST'
  //       }).flush(null, { status: 200, statusText: 'Ok' });
  //     })));

});

// describe(`FakeHttpClientResponses`, () => {

//   beforeEach(() => {
//     // 0. set up the test environment
//     TestBed.configureTestingModule({
//       imports: [
//         // no more boilerplate code w/ custom providers needed :-)
//         HttpClientModule,
//         HttpClientTestingModule
//       ]
//     });
//   });

//   it(`should issue a request`,
//     // 1. declare as async test since the HttpClient works with Observables
//     async(
//       // 2. inject HttpClient and HttpTestingController into the test
//       inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
//         // 3. send a simple request
//         // http.get('/foo/bar').subscribe();
//         const loginForm = {user_id: 'admin', password: 'admin123'};
//         http.post(environment.auth_microservice + '/user/', loginForm).subscribe();
//         // 4. HttpTestingController supersedes `MockBackend` from the "old" Http package
//         // here two, it's significantly less boilerplate code needed to verify an expected request
//         backend.expectOne({
//           url: environment.auth_microservice + '/user/',
//           method: 'POST'
//         });
//       })
//     )
//   );

// });

// describe('AuthenticationService', () => {
//   // Mock the service like this and add all the functions you have in this fashion
//   let service: AuthenticationService,
//     mockService = {
//       addSession: jasmine.createSpy('addSession').and.returnValue(of('your session object mock goes here'))
//     };

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [{
//         provide: AuthenticationService,
//         useValue: mockService
//       }]
//     });
//   });

//   // Do this trick to inject the service every time, and just use `service` in your tests
//   beforeEach(inject([AuthenticationService], (authenticationService) => {
//     service = authenticationService;
//   }));

//   describe('addSession', () => {
//     it('add session ', () => {
//       let fakeResponse = null;
//       const loginCredentials = { user_id: 'admin', password: 'admin123'};
//       // Call the service function and subscribe to it to catch the fake response coming from the mock.
//       service.saveLogin(loginCredentials).subscribe((value) => {
//         // in here value will be whatever you put as returnValue (remember to keep the observable.of())
//         fakeResponse = value;
//       });

//       // expects as in any test.
//       expect(fakeResponse).toBeDefined();
//       expect(fakeResponse).toBe(mockService.addSession);
//     });
//   });
// });


// describe('AuthenticationService', () => {
//   let service: AuthenticationService;
//   let httpMock: HttpTestingController;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [AuthenticationService]
//     });
//     service = TestBed.get(AuthenticationService);
//     httpMock = TestBed.get(HttpTestingController);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should have SaveLogin function ', () => {
//     const loginCredentials = { user_id: 'admin', password: 'admin123'};
//     expect(service.saveLogin).toBeTruthy();
//   });

//   it('it should login correctly', () => {

//     const loginCredentials = { user_id: 'admin', password: 'admin123'};
//     const data = service.saveLogin(loginCredentials);
//     console.log('data', data);
//   });

// });
