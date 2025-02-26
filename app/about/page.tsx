import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  return (
    <div className="space-y-12 py-8">
      {/* Mission and Problem Statement */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About GreenChain</h1>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              GreenChain is revolutionizing the carbon credit market by leveraging blockchain technology to create a
              more efficient, transparent, and accessible marketplace for environmental sustainability.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">The Problem</h2>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                The current carbon credit market faces several critical challenges:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Lengthy verification processes delaying credit issuance</li>
                <li>Over 40% of earnings lost to intermediaries</li>
                <li>Small credit units unattractive to large buyers</li>
                <li>Lack of transparency and trust in the market</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Our Solution</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Smart Verification</h3>
              <p className="text-muted-foreground">
                Utilizing blockchain technology to streamline and accelerate the verification process while maintaining
                rigorous standards.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Direct Trading</h3>
              <p className="text-muted-foreground">
                Eliminating unnecessary intermediaries to ensure more value reaches the actual carbon credit generators.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Credit Pooling</h3>
              <p className="text-muted-foreground">
                Innovative grouping mechanism allowing small credit holders to combine their assets, attracting larger
                buyers.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Our Team</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="aspect-square relative rounded-full overflow-hidden w-32 mx-auto mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ME.jpg-kQpIL90lpyLODjY4NTFfmEXD9WT2lU.jpeg"
                  alt="Elly Odhiambo"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-center">Elly Odhiambo</h3>
              <p className="text-primary font-medium text-center mb-4">Blockchain & Sustainability Lead</p>
              <p className="text-muted-foreground text-center">
                A passionate advocate for sustainable technology, Elly combines blockchain expertise with environmental
                consciousness to drive innovative solutions in carbon credit trading.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="aspect-square relative rounded-full overflow-hidden w-32 mx-auto mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kay.jpg-o6jtFM5rqcxftWxowBgja8c5unxQmh.jpeg"
                  alt="Ian Kahuria"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-center">Ian Kahuria</h3>
              <p className="text-primary font-medium text-center mb-4">Operations and Growth Lead</p>
              <p className="text-muted-foreground text-center">
                With a strong background in business development and market analysis, Ian spearheads strategic
                initiatives to expand GreenChain's impact in the carbon credit ecosystem.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="aspect-square relative rounded-full overflow-hidden w-32 mx-auto mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chrismunene.jpg-tSi4Var9lYrferSkYATvYGZ3ue6yM1.jpeg"
                  alt="Chris Munene"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-center">Chris Munene</h3>
              <p className="text-primary font-medium text-center mb-4">Tech Lead</p>
              <p className="text-muted-foreground text-center">
                A skilled full-stack developer with expertise in blockchain technology, Chris leads the technical
                development of GreenChain's innovative platform and smart contract infrastructure.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

