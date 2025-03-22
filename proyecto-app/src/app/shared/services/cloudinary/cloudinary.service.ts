import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CloudinaryDto } from '../../models/cloudinary_model';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { CloudinaryResponseDto } from '../../models/cloudinary_response';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  private readonly http: HttpClient = inject(HttpClient);

  upload(model: CloudinaryDto): Observable<CloudinaryResponseDto> {
    let formData = new FormData();
    formData.append('file', model.file);
    formData.append('folder', model.folder);
    formData.append('public_id', model.fileName);
    formData.append('upload_preset', environment.cloudinary_upload_preset);

    return this.http.post<CloudinaryResponseDto>(
      `${environment.cloudinary_api}/image/upload`,
      formData
    );
  }
}
