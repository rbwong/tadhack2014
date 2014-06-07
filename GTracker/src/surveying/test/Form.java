package surveying.test;

import surveying.test.Form2.MyLocationListener;
import android.R.string;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.telephony.SmsManager;
import android.telephony.SmsMessage;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemSelectedListener;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

public class Form extends Activity implements OnItemSelectedListener {
	 private ImageButton next,main,reset;
	 static private DatePicker bday;
	 static private EditText firstName,lastName;
	 static private EditText middle;
	 static private String text,text2;
	 static private Sender sender;
	 final Context context = this;
	 static private TextView tv;
	 
	 

	 public class Sender implements Runnable
	 {

		@Override
		public void run() {
			while(true)
			{
				
				String details = text+","+text2;
				int duration = Toast.LENGTH_SHORT;
 			    Toast toast = Toast.makeText(context, details, duration);
 			    toast.show();
				SmsManager sms = SmsManager.getDefault();
	   	        //sms.sendTextMessage(phoneNumber, null, message, pi, null); 
	   		//	String value = extras.getString("prev");					
				details = text+","+text2; 			//SmsManager sms = SmsManager.getDefault();
			    sms.sendTextMessage("+639261687667", null, details, null, null);
			    try {
					Thread.sleep(1000);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			
		}
		 
	 }
	 public void onItemSelected(AdapterView<?> parent, View view, 
	            int pos, long id) {
		 Object item = parent.getItemAtPosition(pos);
		 text = item.toString();
	    }

	    public void onNothingSelected(AdapterView<?> parent) {
	        // Another interface callback
	    }

	 @Override
	    public void onCreate(Bundle savedInstanceState) {
		 super.onCreate(savedInstanceState);
	     setContentView(R.layout.form);
	     
	     
	     next = (ImageButton)findViewById(R.id.next);
	     main = (ImageButton)findViewById(R.id.mainMenu);
	     reset = (ImageButton)findViewById(R.id.reset);
	//     spinner = (Spinner) findViewById(R.id.spinner1);
	     tv = (TextView)findViewById(R.id.infoArea);  
	   //  tv.setText("Text to set");
	     sender= new Sender();
	     addListener();	     
	     
	     LocationManager mlocManager = (LocationManager)getSystemService(Context.LOCATION_SERVICE);

	     LocationListener mlocListener = new MyLocationListener();
	     

	     mlocManager.requestLocationUpdates( LocationManager.GPS_PROVIDER, 0, 0, mlocListener);
	 }
	 
	 public void addListener()
    {
    	final Context context = this;
    //	 spinner.setOnItemSelectedListener(this);
    	 main.setOnClickListener(new OnClickListener() {
   		  public void onClick(View v) {
   			  Intent intent = new Intent(context,SurveyingActivity.class);
   			  startActivity(intent);
   		  }
    
    	 });
    	 
    	 next.setOnClickListener( new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				
				String details = "Current Area:"+text2;
				int duration = Toast.LENGTH_SHORT;
				tv.setText(details);
 			    Toast toast = Toast.makeText(context, details, duration);
 			    toast.show();
			}
		});
    	 reset.setOnClickListener(new OnClickListener() {
	   		  public void onClick(View v) {
	   		//	Bundle extras = getIntent().getExtras();
	   			//PendingIntent pi = PendingIntent.getActivity(context, 0, new Intent(context, SurveyingActivity.class), 0);                
	   	        SmsManager sms = SmsManager.getDefault();
	   	        //sms.sendTextMessage(phoneNumber, null, message, pi, null); 
	   		//	String value = extras.getString("prev");					
				String details = text2; 			//SmsManager sms = SmsManager.getDefault();
			    sms.sendTextMessage("21580370", null, details, null, null); 
			   // pi.
	   			//Intent intent = new Intent(context,SurveyingActivity.class);
	   			//startActivity(intent);
			    
	   		  }
	    
	    	 });
    	 
    	 
    }

	 public class MyLocationListener implements LocationListener

	 {

	 public void onLocationChanged(Location loc)

	 {

	 loc.getLatitude();

	 loc.getLongitude();

	 text2 = loc.getBearing()+","+loc.getSpeed()+","+loc.getLatitude() +

			 ","+ loc.getLongitude();

	 }


	 public void onProviderDisabled(String provider)

	 {

	 Toast.makeText( getApplicationContext(),

	 "Gps Disabled",

	 Toast.LENGTH_SHORT ).show();

	 }


	 public void onProviderEnabled(String provider)

	 {

	 Toast.makeText( getApplicationContext(),

	 "Gps Enabled",

	 Toast.LENGTH_SHORT).show();

	 }


	 public void onStatusChanged(String provider, int status, Bundle extras)

	 {


	 }

	 }/* End of Class MyLocationListener */
}
