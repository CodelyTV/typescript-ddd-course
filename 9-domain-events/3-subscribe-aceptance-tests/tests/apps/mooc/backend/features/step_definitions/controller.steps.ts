import assert from 'assert';
import { AfterAll, BeforeAll, Given, Then } from 'cucumber';
import request from 'supertest';
import { MoocBackendApp } from '../../../../../../src/apps/mooc/backend/MoocBackendApp';
import container from '../../../../../../src/apps/mooc/backend/dependency-injection';
import { EnvironmentArranger } from '../../../../../Contexts/Shared/infrastructure/arranger/EnvironmentArranger';

let _request: request.Test;
let application: MoocBackendApp;
let _response: request.Response;
let environmentArranger: EnvironmentArranger;

Given('I send a GET request to {string}', (route: string) => {
  _request = request(application.httpServer).get(route);
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
  _request = request(application.httpServer).put(route).send(JSON.parse(body));
});

Then('the response should be empty', () => {
  assert.deepStrictEqual(_response.body, {});
});

Then('the response content should be:', response => {
  assert.deepStrictEqual(_response.body, JSON.parse(response));
});

BeforeAll(async () => {
  environmentArranger = await container.get<Promise<EnvironmentArranger>>('Mooc.EnvironmentArranger');
  await environmentArranger.arrange();

  application = new MoocBackendApp();
  await application.start();
});

AfterAll(async () => {
  await environmentArranger.close();

  await application.stop();
});
