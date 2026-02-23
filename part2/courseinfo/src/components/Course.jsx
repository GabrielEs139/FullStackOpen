const Header = ({course}) =>{
  console.log(course)
  return (
      <h1>
        {course.name}
      </h1>
  )
}

const Content = ({course}) =>{
  console.log(course)
  return (
    <div>
      {course.parts.map(part =>
        <Part key={part.id} part = {part}/>
      )}
    </div>
  )
}

const Part = (props) =>{
  console.log(props)
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  )
}

const Total = ({course}) =>{
  console.log(course)
  const total = course.parts.reduce(
    (tot, part) => tot + part.exercises, 0
  );

  return(
      <p>
        Number of exercises {total}
      </p>
  )
}

const Course = ({courses}) => (
  <div>
    {courses.map(
      course => 
      <div key={course.id}>
        <Header course={course}/>
        <Content course={course}/>
        <Total course = {course} />
      </div>
    )}
    
  </div>  
)

export default Course