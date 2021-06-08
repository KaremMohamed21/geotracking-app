import { Injectable } from '@nestjs/common';
import { people } from './users.list';
import * as Pusher from 'pusher';
import { get } from 'config';
import { User } from './user.model';

@Injectable()
export class UsersService {
  private pusher: Pusher;

  constructor() {
    this.pusher = new Pusher({
      appId: get('pusher.appId'),
      key: get('pusher.key'),
      secret: get('pusher.secret'),
      cluster: get('pusher.cluster'),
      useTLS: get('pusher.useTLS'),
    });
  }

  // Get all Users
  getAllUsers(): User[] {
    return people.map((person) => ({
      name: person.name,
      position: person.position,
    }));
  }

  // Post Position
  postLocation(user: User) {
    const { lat, lng } = user.position;

    people.forEach((person, index) => {
      if (person.position.lat === user.position.lat) {
        people[index] = { ...person, position: { lat, lng } };
        return this.pusher.trigger('map-geofencing', 'location', {
          person: people[index],
          people,
        });
      }
    });
  }
}
