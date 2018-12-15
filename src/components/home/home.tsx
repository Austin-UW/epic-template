import React, { Component } from 'react'
import { Header } from '..'
/**
 * @todo make it work, but what should It display?
 */
export class Home extends Component {
  render() {
    return (
      <div>
        <Header currentComponent="home" />
        <div>
          <h1 style={{ textAlign: 'center', fontSize: 24, fontWeight: 400 }}>
            Henlo welcome to my radio Ghandini Is a very cool dude, but that is NOT me, I am a nice,
            christian, American Mom with a passion for American. I'd just like to hear what you guys think of
            ghandini, like, of course, as an American Mom whose name is umm... Sharlene, I don't like but I
            mean he has done some cool stuff so I dont know.
          </h1>
        </div>
      </div>
    )
  }
}
