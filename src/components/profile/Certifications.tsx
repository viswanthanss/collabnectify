
import React from 'react';
import { Book, Calendar, Award, ExternalLink, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Certification {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  credentialUrl?: string;
}

const Certifications = () => {
  const certifications: Certification[] = [
    {
      id: '1',
      name: 'TensorFlow Developer Certificate',
      organization: 'Google',
      issueDate: 'Jan 2023',
      credentialId: 'TF2023-ABCD-1234',
      credentialUrl: 'https://example.com/cert/tf-dev'
    },
    {
      id: '2',
      name: 'AWS Certified Machine Learning – Specialty',
      organization: 'Amazon Web Services',
      issueDate: 'Mar 2022',
      expiryDate: 'Mar 2025',
      credentialId: 'AWS-ML-912345',
      credentialUrl: 'https://example.com/cert/aws-ml'
    },
    {
      id: '3',
      name: 'Deep Learning Specialization',
      organization: 'Coursera / DeepLearning.AI',
      issueDate: 'Dec 2021',
      credentialId: 'DLS-2021-7890',
      credentialUrl: 'https://example.com/cert/dls'
    }
  ];

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Certifications & Credentials</CardTitle>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="border rounded-lg p-4 hover:bg-secondary/5 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{cert.name}</h4>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Award className="h-4 w-4 mr-1" />
                    <span>{cert.organization}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Verify
                  </a>
                </Button>
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                  <div>
                    <p className="text-xs text-muted-foreground">Issued</p>
                    <p>{cert.issueDate}</p>
                  </div>
                </div>
                {cert.expiryDate && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                    <div>
                      <p className="text-xs text-muted-foreground">Expires</p>
                      <p>{cert.expiryDate}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center col-span-2">
                  <Book className="h-4 w-4 text-muted-foreground mr-2" />
                  <div>
                    <p className="text-xs text-muted-foreground">Credential ID</p>
                    <p>{cert.credentialId}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Certifications;
