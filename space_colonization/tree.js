function Tree() {
  this.leaves = [];
  this.branches = [];

  for ( var i = 0; i < 400; i++ ) {
    this.leaves.push( new Leaf() );
  }

  var pos = createVector( width / 2, height );
  var dir = createVector( 0, -1 );
  var root = new Branch( null, pos, dir );
  this.branches.push( root );
  var current = root;
  var found = false;

  while ( !found ) {
    var len = this.leaves.length;
    for ( var i = 0; i < len; i++ ) {
      var d = p5.Vector.dist( current.pos, this.leaves[ i ].pos );
      if ( d < max_dist ) {
        found = true;
      }
    }
    if ( !found ) {
      var branch = current.next();
      current = branch;
      this.branches.push( current );
    }
  }

  this.grow = function() {
  console.log("growing");
  var leaLen = this.leaves.length;
    for ( var i = 0; i < leaLen; i++ ) {
      var leaf = this.leaves[ i ];

      var closestBranch = null;
      var record = 100000;
      var branLen = this.branches.length;
      for ( var j = 0; j < branLen; j++ ) {
        var branch = this.branches [ j ];
        var d = p5.Vector.dist( leaf.pos, branch.pos );
        if ( d < min_dist ) {
          leaf.reached = true;
          closestBranch = null;
          break;
        } else if ( d > max_dist ) {
          // do nothing
        } else if ( closestBranch == null || d < record ) {
          closestBranch = branch;
          record = d;
        }
      }
      if ( closestBranch != null ) {
        var newDir = p5.Vector.sub( leaf.pos, closestBranch.pos );
        newDir.normalize();
        closestBranch.dir.add( newDir );
        closestBranch.count += 1;
      }
    }
    var i = this.leaves.length - 1;
    for ( ; i >= 0; i-- ) {
      if ( this.leaves[ i ].reached ) {
        this.leaves.splice( i, 1 );
      }
    }

    var j = this.branches.length - 1;
    for ( ; j >= 0; j-- ) {
      var branch = this.branches[ j ];
      if ( branch.count > 0 ) {
         branch.dir.div( branch.count + 1 ); 
         this.branches.push( branch.next() );
      }
    }
  }

  this.show = function() {
    var leaLen = this.leaves.length;
    for ( var i = 0; i < leaLen; i++ ) {
      this.leaves[ i ].show();
    }
    var braLen = this.branches.length;
    for ( var j = 0; j < braLen; j++ ) {
      this.branches[ j ].show();
    }
  }
}
