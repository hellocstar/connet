import React, { useState, useEffect } from 'react'
import { Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}))

const NewEvent = ({ onActivityIDChange, onRouteChange, isSignedIn, user }) => {
  const classes = useStyles()

  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState('')
  const [categories, setCategories] = useState([])

  if (isSignedIn) {
    const categoriesList = [
      'Outdoors & Adventure',
      'Tech',
      'Family',
      'Health & Wellness',
      'Sports & Fitness',
      'Learning',
      'Photography',
      'Food & Drink',
      'Writing',
      'Language & Culture',
      'Music',
      'Film',
      'Beliefs',
      'Arts',
      'Fashion & Beauty',
      'Career & Business',
    ]

    const ITEM_HEIGHT = 48
    const ITEM_PADDING_TOP = 8
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    }

    const onSubmit = () => {
      fetch('http://localhost:3000/newevent', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          date: date,
          time: time,
          location: location,
          organiserID: user.id,
          description: description,
          //photo: photo,
          categories: categories,
        }),
      })
        .then(response => response.json())
        .then(id => {
          if (id) {
            onActivityIDChange(id)
            onRouteChange('event/' + id)
          }
        })
    }

    const handleImageUpload = event => {
      console.log(event)
      const files = event.target.files
      const formData = new FormData()
      formData.append('eventPhoto', files[0])
      const file = fetch('/event/photo', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.formData())
        .then(data => {
          console.log(data)
        })
        .catch(error => {
          console.error(error)
        })
      setPhoto(file)
    }

    return (
      <div>
        <fieldset id="new_event">
          <legend>Tell others your idea!</legend>
          <div>
            <label htmlFor="name">Name of the Event</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={event => setName(event.target.value)}
            />
          </div>
          <div>
            {/* <input
              id="contained-button-file"
              multiple
              type="file"
              onChange={event => handleImageUpload(event, event.target.file)}
            /> */}
            {/* <label htmlFor="contained-button-file">
              <Button
                variant="raised"
                component="span"
                onClick={event => handleImageUpload(event, event.target.file)}
              >
                Upload
              </Button>
            </label> */}
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              onChange={event => setDate(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="time"
              name="time"
              id="time"
              onChange={event => setTime(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              id="location"
              onChange={event => setLocation(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              onChange={event => setDescription(event.target.value)}
            />
          </div>
          {/* <div>
						<label htmlFor='photo'>Photo</label>
						<input
							type='text'
							name='photo'
							id='photo'
							onChange={(event) => setPhoto(event.target.value)}
						/>
					</div> */}
          <div>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={categories}
              onChange={event => setCategories(event.target.value)}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {categoriesList.map(cat => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </div>
        </fieldset>
        <div className="">
          <input onClick={onSubmit} type="submit" value="Create!" />
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <p>Sign In or Sign Up to do whatever you want!</p>
      </div>
    )
  }
}

export default NewEvent
