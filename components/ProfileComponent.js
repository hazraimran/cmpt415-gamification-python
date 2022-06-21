import { useContext, useState, useEffect } from 'react'
import Context from '../context/Context'
import AchievementComponent from '../components/AchievementComponent'
import achievementsJson from '../data/achievements.json'

export default function ProfileComponent(props) {
    const { user } = useContext(Context)
    const [achievements, setAchievements] = useState([])

    const loadAchievements = () => {
        setAchievements([])
        const achievementsList = achievementsJson.achievements
        // loop through all elements in achievements.json
        for (let i = 0; i < achievementsList.length; i++) {
            const achievement = achievementsList[i]

            if (user.achievements.includes(achievement.id)) {
                setAchievements([
                    ...achievements,
                    <AchievementComponent id={achievement.id} description={achievement.description} emoji={achievement.emoji} />
                ])
            }
        }
    }
    // loadAchievements only once
    useEffect(() => {
        loadAchievements()
    }, [user])

    return (
        <div className="container mx-auto">
            <h3>My Profile</h3>
            <hr />
            <div className="container">
                <div className="row">
                  <div className="col-sm">
                    <h4>{user.name}</h4>
                    <p>{user.email} &middot; Also known as "{user.anonymousName}"</p>
                    <a href="#">Edit Profile</a>
                    <br /><br />
                    <h5>Student</h5>
                    <ul>
                        <li>Score: {user.score}</li>
                        <li>Level: {user.level}</li>
                        <li>Streak: ...</li>
                    </ul>
                    <br />
                    <h5>Friends</h5>
                    <ul>
                        <li>...</li>
                    </ul>
                  </div>
                  <div className="col-sm">
                    <h4>Modules</h4>
                    <ul className="profile-modules-list">
                        <li>
                            <span className="profile-modules-title">Conditional Statements</span>
                            <span className="profile-modules-progress">
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </span>
                        </li>
                    </ul>
                  </div>
                  <div className="col-sm">
                    <h4>Achievements</h4>
                    <ul className="achievement-list">
                        {
                            achievements.map(achievement => {
                                return (
                                    <li>
                                        {achievement}
                                    </li>
                                )
                            })
                        }
                    </ul>
                  </div>
                </div>
            </div>
        </div>
    )
}