import '../styles/tailwind.input.css'

interface FeatureCardProps {
    h: string;
    p: string;
    iconUrl: string;
}
export default function FeatureCard({h, p, iconUrl}: FeatureCardProps){
    return(
        <div className="feature-card">
          <div className="feature-icon">
            <img src={iconUrl} />
          </div>
          <div>
            <h4 className="font-bold">{h}</h4>
            <p className="text-[0.85rem] text-muted">{p}</p>
          </div>
        </div>
    )

}